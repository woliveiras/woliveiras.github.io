from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
	database_url: str = "postgresql+psycopg://vetsupport:vetsupport@localhost:5432/vetsupport"
	openai_api_key: str | None = None

	model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


@lru_cache
def get_settings() -> Settings:
	return Settings()

