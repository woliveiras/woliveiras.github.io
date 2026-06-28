FROM ghcr.io/astral-sh/uv:0.9.5-python3.12-bookworm-slim

WORKDIR /app

COPY pyproject.toml uv.lock README.md ./
COPY src ./src

RUN uv sync --frozen --no-dev

ENTRYPOINT ["uv", "run", "--no-sync", "python", "-m", "vetsupport"]
