from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict

DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small"
EMBEDDING_DIMENSIONS = 256


class Settings(BaseSettings):
	database_url: str = "postgresql+psycopg://vetsupport:vetsupport@localhost:5432/vetsupport"
	openai_api_key: str | None = None
	embedding_provider: str = "openai"
	embedding_model: str = DEFAULT_EMBEDDING_MODEL

	model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


@lru_cache
def get_settings() -> Settings:
	return Settings()

