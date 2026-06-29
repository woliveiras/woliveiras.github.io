from collections.abc import Iterator
from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from vetsupport.config import get_settings


def create_db_engine():
	return create_engine(get_settings().database_url, echo=False)


@contextmanager
def session_scope() -> Iterator[Session]:
	engine = create_db_engine()
	with Session(engine) as session:
		try:
			yield session
			session.commit()
		except Exception:
			session.rollback()
			raise
		finally:
			engine.dispose()

