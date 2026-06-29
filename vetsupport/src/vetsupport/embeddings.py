from __future__ import annotations

import hashlib
import math
import re
from typing import Protocol

from vetsupport.config import EMBEDDING_DIMENSIONS, Settings

_TOKEN_RE = re.compile(r"[a-z0-9]+")


class Embedder(Protocol):
	model: str
	dimensions: int

	def embed_documents(self, texts: list[str]) -> list[list[float]]: ...

	def embed_query(self, text: str) -> list[float]: ...


class FakeEmbedder:
	"""Deterministic offline embedder using feature hashing.

	Produces L2-normalized bag-of-words vectors, so chunks and queries that
	share terms end up closer in cosine space. It never calls an external API,
	which keeps tests and offline documentation runs reproducible.
	"""

	def __init__(self, dimensions: int = EMBEDDING_DIMENSIONS) -> None:
		self.model = "fake-hashing-v1"
		self.dimensions = dimensions

	def embed_documents(self, texts: list[str]) -> list[list[float]]:
		return [self._embed(text) for text in texts]

	def embed_query(self, text: str) -> list[float]:
		return self._embed(text)

	def _embed(self, text: str) -> list[float]:
		vector = [0.0] * self.dimensions
		for token in _TOKEN_RE.findall(text.lower()):
			digest = hashlib.md5(token.encode("utf-8")).digest()
			index = int.from_bytes(digest[:4], "big") % self.dimensions
			sign = 1.0 if digest[4] & 1 else -1.0
			vector[index] += sign
		return _normalize(vector)


class OpenAIEmbedder:
	"""Embedder backed by the OpenAI embeddings API."""

	def __init__(
		self,
		api_key: str,
		model: str,
		dimensions: int = EMBEDDING_DIMENSIONS,
	) -> None:
		from openai import OpenAI

		self._client = OpenAI(api_key=api_key)
		self.model = model
		self.dimensions = dimensions

	def embed_documents(self, texts: list[str]) -> list[list[float]]:
		if not texts:
			return []
		response = self._client.embeddings.create(
			model=self.model,
			input=texts,
			dimensions=self.dimensions,
		)
		return [list(item.embedding) for item in response.data]

	def embed_query(self, text: str) -> list[float]:
		return self.embed_documents([text])[0]


def _normalize(vector: list[float]) -> list[float]:
	norm = math.sqrt(sum(value * value for value in vector))
	if norm == 0.0:
		return vector
	return [value / norm for value in vector]


def get_embedder(settings: Settings, provider: str | None = None) -> Embedder:
	"""Build an embedder from settings, with an optional provider override."""
	selected = (provider or settings.embedding_provider).lower()
	if selected == "fake":
		return FakeEmbedder()
	if selected == "openai":
		if not settings.openai_api_key:
			raise ValueError(
				"OPENAI_API_KEY is required for the 'openai' embedder. "
				"Set it in .env or use --embedder fake for an offline run."
			)
		return OpenAIEmbedder(
			api_key=settings.openai_api_key,
			model=settings.embedding_model,
		)
	raise ValueError(f"Unknown embedder provider: {selected}")
