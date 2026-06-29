from vetsupport.safety import (
	BASE_DISCLAIMER,
	EMERGENCY_DISCLAIMER,
	PROFESSIONAL_DISCLAIMER,
	SafetyLevel,
	assess_query,
)


def test_neutral_query_is_ok_with_base_disclaimer() -> None:
	assessment = assess_query("show Luna's vaccination history")

	assert assessment.level is SafetyLevel.ok
	assert assessment.escalate is False
	assert assessment.reasons == []
	assert BASE_DISCLAIMER in assessment.disclaimers


def test_emergency_query_escalates() -> None:
	assessment = assess_query("my dog is not breathing and had a seizure")

	assert assessment.level is SafetyLevel.emergency
	assert assessment.escalate is True
	assert EMERGENCY_DISCLAIMER in assessment.disclaimers
	assert assessment.reasons


def test_diagnosis_query_requires_professional() -> None:
	assessment = assess_query("what is the diagnosis for these lab values?")

	assert assessment.level is SafetyLevel.caution
	assert assessment.escalate is False
	assert PROFESSIONAL_DISCLAIMER in assessment.disclaimers


def test_medication_change_query_requires_professional() -> None:
	assessment = assess_query("should I stop the medication for Bento?")

	assert assessment.level is SafetyLevel.caution
	assert PROFESSIONAL_DISCLAIMER in assessment.disclaimers


def test_disclaimers_are_not_duplicated() -> None:
	assessment = assess_query("what is the diagnosis and should I change the dosage?")

	assert assessment.disclaimers.count(PROFESSIONAL_DISCLAIMER) == 1
