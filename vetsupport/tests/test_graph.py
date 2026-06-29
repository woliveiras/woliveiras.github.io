from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from vetsupport.chunking import chunk_pet_documents
from vetsupport.embeddings import FakeEmbedder
from vetsupport.graph import build_agent_graph, classify_intent
from vetsupport.indexing import index_pet_chunks
from vetsupport.llm import FakeLLM
from vetsupport.models import Base
from vetsupport.seed import seed_basic_clinic

LUNA_ID = "30000000-0000-0000-0000-000000000001"


def indexed_session() -> Session:
	engine = create_engine("sqlite:///:memory:")
	Base.metadata.create_all(engine)
	session = Session(engine)
	seed_basic_clinic(session)
	chunk_pet_documents(session, pet_id=LUNA_ID)
	index_pet_chunks(session, pet_id=LUNA_ID, embedder=FakeEmbedder())
	session.commit()
	return session


def test_classify_intent_routes_vaccine_to_lexical() -> None:
	state = classify_intent({"query": "show the vaccination history"})

	assert state["intent"] == "vaccine_history"
	assert state["retrieval_mode"] == "lexical"


def test_classify_intent_routes_emergency() -> None:
	state = classify_intent({"query": "my dog is not breathing"})

	assert state["intent"] == "emergency"
	assert state["safety"].escalate is True


def test_classify_intent_defaults_to_general_hybrid() -> None:
	state = classify_intent({"query": "tell me about Luna"})

	assert state["intent"] == "general"
	assert state["retrieval_mode"] == "hybrid"


def test_agent_graph_produces_grounded_answer() -> None:
	session = indexed_session()
	agent = build_agent_graph(session, FakeEmbedder(), FakeLLM())

	state = agent.invoke({"query": "vaccination history", "pet_id": LUNA_ID})

	assert state["intent"] == "vaccine_history"
	assert state["evidence"]
	assert state["citations"]
	assert "[1]" in state["draft"].summary
