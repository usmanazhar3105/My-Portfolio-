import os
import time
import typing as t

import requests


class GrokClient:
	"""Thin client for LLM chat completions (xAI Grok or Groq).

	Auto-detects provider by API key prefix unless overridden via env vars.
	"""

	def __init__(
		self,
		api_key: t.Optional[str] = None,
		model: t.Optional[str] = None,
		endpoint: t.Optional[str] = None,
		timeout_seconds: int = 60,
		provider: t.Optional[str] = None,  # 'xai' or 'groq'
	):
		self.api_key = api_key or os.getenv("GROK_API_KEY") or os.getenv("XAI_API_KEY") or os.getenv("GROQ_API_KEY")
		if not self.api_key:
			raise ValueError("No API key found. Set GROK_API_KEY (or XAI_API_KEY / GROQ_API_KEY) in environment.")

		# Provider resolution: explicit > env > prefix heuristic
		self.provider = (
			provider
			or os.getenv("GROK_PROVIDER")
			or ("groq" if self.api_key.startswith("gsk_") else "xai")
		)
		if self.provider not in {"xai", "groq"}:
			raise ValueError("GROK_PROVIDER must be 'xai' or 'groq'.")

		# Endpoint and model defaults per provider (overridable by env/args)
		default_endpoint = (
			"https://api.x.ai/v1/chat/completions"
			if self.provider == "xai"
			else "https://api.groq.com/openai/v1/chat/completions"
		)
		self.endpoint = endpoint or os.getenv("GROK_ENDPOINT") or default_endpoint
		# Updated Groq default model to a supported variant
		default_groq_model = "llama-3.3-70b-versatile"
		self.groq_fallback_models = ["llama-3.1-8b-instant", "llama-3.1-70b-versatile", "mixtral-8x7b-32768"]
		default_model = (
			"grok-2-latest" if self.provider == "xai" else os.getenv("GROQ_MODEL", default_groq_model)
		)
		self.model = model or os.getenv("GROK_MODEL") or default_model
		self.timeout_seconds = timeout_seconds

	def _request(self, payload: dict[str, t.Any]) -> requests.Response:
		headers = {
			"Authorization": f"Bearer {self.api_key}",
			"Content-Type": "application/json",
		}
		# Some gateways accept x-api-key as well; harmless for xAI, ignored by Groq
		headers["x-api-key"] = self.api_key

		last_exc: t.Optional[Exception] = None
		backoff_seconds = 1.0  # Start with longer delay
		for attempt in range(1, 4):
			resp = None
			try:
				resp = requests.post(
					self.endpoint,
					headers=headers,
					json=payload,
					timeout=self.timeout_seconds,
				)
				# Retry on 5xx
				if 500 <= resp.status_code < 600:
					last_exc = RuntimeError(f"Server {resp.status_code}: {resp.text}")
					time.sleep(backoff_seconds)
					backoff_seconds *= 2.0  # Exponential backoff
					continue
				resp.raise_for_status()
				return resp
			except requests.RequestException as exc:
				last_exc = exc
				time.sleep(backoff_seconds)
				backoff_seconds *= 2.0
				continue
		# If still failing, raise with context
		raise RuntimeError(f"Chat API request failed after retries (provider={self.provider}): {last_exc}")

	def generate_code(
		self,
		prompt: str,
		system_prompt: str = "You are an expert coding assistant. Return only executable code unless told otherwise.",
		temperature: float = 0.2,
		max_tokens: t.Optional[int] = None,
	) -> str:
		"""Send prompt to provider and return the assistant's content string.

		On persistent 5xx from Groq, tries multiple fallback models.
		"""

		payload: dict[str, t.Any] = {
			"model": self.model,
			"messages": [
				{"role": "system", "content": system_prompt},
				{"role": "user", "content": prompt},
			],
			"temperature": temperature,
		}
		if max_tokens is not None:
			payload["max_tokens"] = max_tokens

		try:
			resp = self._request(payload)
		except Exception as first_exc:
			# If provider is Groq, try fallback models
			if self.provider == "groq":
				for fallback_model in self.groq_fallback_models:
					if fallback_model == self.model:
						continue  # Skip if already tried
					try:
						payload_fallback = dict(payload)
						payload_fallback["model"] = fallback_model
						resp = self._request(payload_fallback)
						break  # Success, exit fallback loop
					except Exception:
						continue  # Try next fallback
				else:
					# All fallbacks failed, raise original error
					raise first_exc
			else:
				raise first_exc

		data = resp.json()
		choices = data.get("choices") or []
		if not choices:
			raise RuntimeError(f"Chat API returned no choices (provider={self.provider}). Raw: {data}")
		message = choices[0].get("message") or {}
		content = message.get("content")
		if not content:
			raise RuntimeError("Chat API response missing content.")
		return content


