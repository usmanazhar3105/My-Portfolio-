import os
import sys
from pathlib import Path

from grok_api.grok_client import GrokClient


def read_prompt_from_args_or_stdin() -> str:
	if len(sys.argv) > 1:
		return " ".join(sys.argv[1:]).strip()
	print("Enter your request (end with Ctrl+D / Ctrl+Z):", file=sys.stderr)
	return sys.stdin.read().strip()


def main() -> int:
	# Load .env if present (minimal inline loader)
	dotenv_path = Path(".env")
	if dotenv_path.exists():
		for line in dotenv_path.read_text(encoding="utf-8").splitlines():
			line = line.strip()
			if not line or line.startswith("#"):
				continue
			if "=" in line:
				k, v = line.split("=", 1)
				os.environ.setdefault(k.strip(), v.strip())

	prompt = read_prompt_from_args_or_stdin()
	if not prompt:
		print("No prompt provided.", file=sys.stderr)
		return 1

	try:
		client = GrokClient()
		code = client.generate_code(prompt)
		print(code)
		return 0
	except Exception as exc:
		print(f"Error: {exc}", file=sys.stderr)
		return 2


if __name__ == "__main__":
	sys.exit(main())


