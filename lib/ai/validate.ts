import type { TailoredCvDraft } from "@/lib/ai/parser";

export class AiValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AiValidationError";
  }
}

function assertNonEmptyString(value: string, fieldName: string) {
  if (!value.trim()) {
    throw new AiValidationError(`${fieldName} must not be empty.`);
  }
}

function assertNonEmptyArray(value: string[], fieldName: string) {
  if (!value.length) {
    throw new AiValidationError(`${fieldName} must not be empty.`);
  }
}

function assertReasonableArrayLengths(
  value: string[],
  fieldName: string,
  min: number,
  max: number,
) {
  if (value.length < min || value.length > max) {
    throw new AiValidationError(
      `${fieldName} must contain between ${min} and ${max} items.`,
    );
  }
}

function assertNoEmptyItems(value: string[], fieldName: string) {
  if (value.some((item) => !item.trim())) {
    throw new AiValidationError(`${fieldName} must not contain empty items.`);
  }
}

export function validateTailoredCvDraft(
  draft: TailoredCvDraft,
): TailoredCvDraft {
  assertNonEmptyString(draft.summary, "summary");
  assertNonEmptyArray(draft.skills, "skills");
  assertNonEmptyArray(draft.experience, "experience");

  assertReasonableArrayLengths(draft.skills, "skills", 3, 25);
  assertReasonableArrayLengths(draft.experience, "experience", 2, 12);

  assertNoEmptyItems(draft.skills, "skills");
  assertNoEmptyItems(draft.experience, "experience");

  if (draft.summary.length < 40) {
    throw new AiValidationError("summary is too short.");
  }

  return {
    summary: draft.summary.trim(),
    skills: draft.skills.map((item) => item.trim()),
    experience: draft.experience.map((item) => item.trim()),
  };
}
