import {
  normalizeBulletList,
  type CvExperienceEntry,
  type CvSkillGroup,
} from "@/lib/cv/base-cv";
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

function assertSkillsMatchBaseStructure(
  value: CvSkillGroup[],
  base: CvSkillGroup[],
) {
  if (value.length !== base.length) {
    throw new AiValidationError("skills must preserve the original group count.");
  }

  value.forEach((group, index) => {
    const baseGroup = base[index];

    if (group.label !== baseGroup.label) {
      throw new AiValidationError("skills group labels must stay unchanged.");
    }

    assertNonEmptyArray(group.items, `skills[${group.label}]`);
    assertReasonableArrayLengths(
      group.items,
      `skills[${group.label}]`,
      1,
      Math.max(baseGroup.items.length + 4, 4),
    );
    assertNoEmptyItems(group.items, `skills[${group.label}]`);
  });
}

function assertExperienceMatchesBaseStructure(
  value: CvExperienceEntry[],
  base: CvExperienceEntry[],
) {
  if (value.length !== base.length) {
    throw new AiValidationError(
      "experience must preserve the original entry count.",
    );
  }

  value.forEach((entry, index) => {
    const baseEntry = base[index];

    if (entry.title !== baseEntry.title) {
      throw new AiValidationError("experience titles must stay unchanged.");
    }

    if (entry.company !== baseEntry.company) {
      throw new AiValidationError("experience companies must stay unchanged.");
    }

    if (entry.workTypeCountry !== baseEntry.workTypeCountry) {
      throw new AiValidationError(
        "experience work type and country must stay unchanged.",
      );
    }

    if (entry.period !== baseEntry.period) {
      throw new AiValidationError("experience periods must stay unchanged.");
    }

    if (entry.bullets.length !== baseEntry.bullets.length) {
      throw new AiValidationError(
        "experience bullet counts must stay unchanged for each role.",
      );
    }

    assertNoEmptyItems(
      entry.bullets,
      `experience[${entry.title}, ${entry.company}]`,
    );
  });
}

export function validateTailoredCvDraft(
  draft: TailoredCvDraft,
  options: {
    baseSkills: CvSkillGroup[];
    baseExperience: CvExperienceEntry[];
  },
): TailoredCvDraft {
  assertNonEmptyString(draft.summary, "summary");
  assertSkillsMatchBaseStructure(draft.skills, options.baseSkills);
  assertExperienceMatchesBaseStructure(
    draft.experience,
    options.baseExperience,
  );

  if (draft.summary.length < 40) {
    throw new AiValidationError("summary is too short.");
  }

  return {
    summary: draft.summary.trim(),
    skills: draft.skills.map((group) => ({
      label: group.label.trim(),
      items: group.items.map((item) => item.trim()),
    })),
    experience: draft.experience.map((entry) => ({
      title: entry.title.trim(),
      company: entry.company.trim(),
      workTypeCountry: entry.workTypeCountry.trim(),
      period: entry.period.trim(),
      bullets: normalizeBulletList(entry.bullets),
    })),
  };
}
