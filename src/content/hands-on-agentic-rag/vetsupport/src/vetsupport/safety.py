from __future__ import annotations

import re
from enum import StrEnum

from pydantic import BaseModel

BASE_DISCLAIMER = (
	"VetSupport organizes information and retrieves evidence. It does not "
	"diagnose, prescribe, change medication, or replace a veterinarian."
)
EMERGENCY_DISCLAIMER = (
	"These signs can be urgent. Seek in-person veterinary care now instead of "
	"waiting for a summary."
)
PROFESSIONAL_DISCLAIMER = (
	"This question needs a veterinarian. VetSupport can summarize the available "
	"evidence and suggest questions to discuss during the consultation."
)

# Word-boundary patterns keep matching conservative and avoid false positives.
_EMERGENCY_PATTERNS = (
	r"not breathing",
	r"can'?t breathe",
	r"difficulty breathing",
	r"seizure",
	r"convulsion",
	r"collapse",
	r"unconscious",
	r"unresponsive",
	r"bloat",
	r"poison",
	r"toxic",
	r"antifreeze",
	r"heavy bleeding",
	r"won'?t stop bleeding",
	r"hit by a car",
	r"choking",
)
_DIAGNOSIS_PATTERNS = (
	r"diagnos",
	r"what is wrong with",
	r"what'?s wrong with",
	r"is it cancer",
	r"does (he|she|it|my pet) have",
	r"is this (cancer|fatal|terminal)",
)
_MEDICATION_PATTERNS = (
	r"prescrib",
	r"what dose",
	r"how much .* (give|administer)",
	r"increase the dose",
	r"decrease the dose",
	r"stop (the |his |her |its )?(medication|medicine|treatment)",
	r"change (the |his |her |its )?(medication|medicine|dose|dosage)",
)


class SafetyLevel(StrEnum):
	ok = "ok"
	caution = "caution"
	emergency = "emergency"


class SafetyAssessment(BaseModel):
	level: SafetyLevel
	escalate: bool
	reasons: list[str]
	disclaimers: list[str]


def assess_query(query: str) -> SafetyAssessment:
	"""Classify a user query before any answer is generated.

	The assessment is deterministic and rule based. It never blocks evidence
	retrieval; it constrains how the answer must be framed and whether the case
	should be escalated to urgent care.
	"""
	text = query.lower()
	reasons: list[str] = []
	disclaimers: list[str] = [BASE_DISCLAIMER]
	level = SafetyLevel.ok
	escalate = False

	if _matches(text, _EMERGENCY_PATTERNS):
		level = SafetyLevel.emergency
		escalate = True
		reasons.append("The query mentions possible emergency signs.")
		disclaimers.append(EMERGENCY_DISCLAIMER)

	if _matches(text, _DIAGNOSIS_PATTERNS):
		level = _raise(level, SafetyLevel.caution)
		reasons.append("The query asks for a diagnosis, which VetSupport cannot provide.")
		_add(disclaimers, PROFESSIONAL_DISCLAIMER)

	if _matches(text, _MEDICATION_PATTERNS):
		level = _raise(level, SafetyLevel.caution)
		reasons.append(
			"The query asks about prescribing or changing medication, "
			"which only a veterinarian can decide."
		)
		_add(disclaimers, PROFESSIONAL_DISCLAIMER)

	return SafetyAssessment(
		level=level,
		escalate=escalate,
		reasons=reasons,
		disclaimers=disclaimers,
	)


def _matches(text: str, patterns: tuple[str, ...]) -> bool:
	return any(re.search(pattern, text) for pattern in patterns)


def _raise(current: SafetyLevel, candidate: SafetyLevel) -> SafetyLevel:
	order = {SafetyLevel.ok: 0, SafetyLevel.caution: 1, SafetyLevel.emergency: 2}
	return candidate if order[candidate] > order[current] else current


def _add(disclaimers: list[str], disclaimer: str) -> None:
	if disclaimer not in disclaimers:
		disclaimers.append(disclaimer)
