import os
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from grok_api.grok_client import GrokClient


# Load environment variables from .env if present
load_dotenv()


class GenerateRequest(BaseModel):
	prompt: str
	temperature: Optional[float] = 0.2
	max_tokens: Optional[int] = None


class GenerateResponse(BaseModel):
	code: str


app = FastAPI(title="Simple Code Bot API", version="1.0.0")

# CORS for local dev; restrict in production
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


@app.post("/generate", response_model=GenerateResponse)
def generate(req: GenerateRequest) -> GenerateResponse:
	try:
		endpoint_env = os.getenv("GROK_ENDPOINT") or None
		model_env = os.getenv("GROK_MODEL") or None
		api_key = os.getenv("GROK_API_KEY") or os.getenv("XAI_API_KEY") or os.getenv("GROQ_API_KEY")
		client = GrokClient(
			api_key=api_key,
			model=model_env,
			endpoint=endpoint_env,
		)
		code = client.generate_code(
			prompt=req.prompt,
			temperature=req.temperature if req.temperature is not None else 0.2,
			max_tokens=req.max_tokens,
		)
		return GenerateResponse(code=code)
	except Exception as exc:
		raise HTTPException(status_code=500, detail=str(exc))


# Convenience for `uvicorn backend.app:app --reload`

