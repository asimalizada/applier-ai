import type { CvExperienceEntry, CvSkillGroup } from "@/lib/cv/base-cv";

export type CvTemplateDraft = {
  summary: string;
  skills: CvSkillGroup[];
  experience: CvExperienceEntry[];
};

export type DocxPlaceholderMap = Record<string, string>;

export const DOCX_TEMPLATE_PLACEHOLDERS = [
  "{{SUMMARY_PLACEHOLDER}}",
  "{{SKILLS_BACKEND}}",
  "{{SKILLS_FRONTEND}}",
  "{{SKILLS_DATA}}",
  "{{SKILLS_CLOUD_DEVOPS}}",
  "{{SKILLS_PRACTICES}}",
  "{{EXPERIENCE_1_TITLE}}",
  "{{EXPERIENCE_1_COMPANY}}",
  "{{EXPERIENCE_1_WORK_TYPE_COUNTRY}}",
  "{{EXPERIENCE_1_DATE}}",
  "{{EXPERIENCE_1_BULLET_1}}",
  "{{EXPERIENCE_1_BULLET_2}}",
  "{{EXPERIENCE_1_BULLET_3}}",
  "{{EXPERIENCE_1_BULLET_4}}",
  "{{EXPERIENCE_2_TITLE}}",
  "{{EXPERIENCE_2_COMPANY}}",
  "{{EXPERIENCE_2_WORK_TYPE_COUNTRY}}",
  "{{EXPERIENCE_2_DATE}}",
  "{{EXPERIENCE_2_BULLET_1}}",
  "{{EXPERIENCE_2_BULLET_2}}",
  "{{EXPERIENCE_2_BULLET_3}}",
  "{{EXPERIENCE_2_BULLET_4}}",
  "{{EXPERIENCE_3_TITLE}}",
  "{{EXPERIENCE_3_COMPANY}}",
  "{{EXPERIENCE_3_WORK_TYPE_COUNTRY}}",
  "{{EXPERIENCE_3_DATE}}",
  "{{EXPERIENCE_3_BULLET_1}}",
  "{{EXPERIENCE_3_BULLET_2}}",
  "{{EXPERIENCE_3_BULLET_3}}",
  "{{EXPERIENCE_4_TITLE}}",
  "{{EXPERIENCE_4_COMPANY}}",
  "{{EXPERIENCE_4_WORK_TYPE_COUNTRY}}",
  "{{EXPERIENCE_4_DATE}}",
  "{{EXPERIENCE_4_BULLET_1}}",
  "{{EXPERIENCE_4_BULLET_2}}",
  "{{EXPERIENCE_4_BULLET_3}}",
  "{{EXPERIENCE_5_TITLE}}",
  "{{EXPERIENCE_5_COMPANY}}",
  "{{EXPERIENCE_5_WORK_TYPE_COUNTRY}}",
  "{{EXPERIENCE_5_DATE}}",
  "{{EXPERIENCE_5_BULLET_1}}",
  "{{EXPERIENCE_5_BULLET_2}}",
  "{{EXPERIENCE_5_BULLET_3}}",
  "{{EXPERIENCE_6_TITLE}}",
  "{{EXPERIENCE_6_COMPANY}}",
  "{{EXPERIENCE_6_WORK_TYPE_COUNTRY}}",
  "{{EXPERIENCE_6_DATE}}",
  "{{EXPERIENCE_6_BULLET_1}}",
  "{{EXPERIENCE_6_BULLET_2}}",
  "{{EXPERIENCE_7_TITLE}}",
  "{{EXPERIENCE_7_COMPANY}}",
  "{{EXPERIENCE_7_WORK_TYPE_COUNTRY}}",
  "{{EXPERIENCE_7_DATE}}",
  "{{EXPERIENCE_7_BULLET_1}}",
  "{{EXPERIENCE_7_BULLET_2}}",
  "{{EXPERIENCE_8_TITLE}}",
  "{{EXPERIENCE_8_COMPANY}}",
  "{{EXPERIENCE_8_WORK_TYPE_COUNTRY}}",
  "{{EXPERIENCE_8_DATE}}",
  "{{EXPERIENCE_8_BULLET_1}}",
] as const;

function getSkillGroupValue(
  skills: CvSkillGroup[],
  label: string,
): string {
  const group = skills.find((item) => item.label === label);
  return group ? group.items.join(" • ") : "";
}

function getExperienceValue(
  experience: CvExperienceEntry[],
  index: number,
): CvExperienceEntry | null {
  return experience[index] ?? null;
}

function getBulletValue(
  experience: CvExperienceEntry[],
  experienceIndex: number,
  bulletIndex: number,
): string {
  const entry = getExperienceValue(experience, experienceIndex);
  return entry?.bullets[bulletIndex] ?? "";
}

export function buildDocxPlaceholderMap(
  draft: CvTemplateDraft,
): DocxPlaceholderMap {
  const placeholders: DocxPlaceholderMap = {
    "{{SUMMARY_PLACEHOLDER}}": draft.summary,
    "{{SKILLS_BACKEND}}": getSkillGroupValue(draft.skills, "Backend"),
    "{{SKILLS_FRONTEND}}": getSkillGroupValue(draft.skills, "Frontend"),
    "{{SKILLS_DATA}}": getSkillGroupValue(draft.skills, "Data"),
    "{{SKILLS_CLOUD_DEVOPS}}": getSkillGroupValue(draft.skills, "Cloud/DevOps"),
    "{{SKILLS_PRACTICES}}": getSkillGroupValue(draft.skills, "Practices"),
  };

  draft.experience.forEach((entry, index) => {
    const placeholderIndex = index + 1;

    placeholders[`{{EXPERIENCE_${placeholderIndex}_TITLE}}`] = entry.title;
    placeholders[`{{EXPERIENCE_${placeholderIndex}_COMPANY}}`] = entry.company;
    placeholders[`{{EXPERIENCE_${placeholderIndex}_WORK_TYPE_COUNTRY}}`] =
      entry.workTypeCountry;
    placeholders[`{{EXPERIENCE_${placeholderIndex}_DATE}}`] = entry.period;

    entry.bullets.forEach((bullet, bulletIndex) => {
      placeholders[
        `{{EXPERIENCE_${placeholderIndex}_BULLET_${bulletIndex + 1}}}`
      ] = bullet;
    });
  });

  const expectedBulletCounts = [4, 4, 3, 3, 3, 2, 2, 1];

  expectedBulletCounts.forEach((count, index) => {
    const placeholderIndex = index + 1;

    if (!placeholders[`{{EXPERIENCE_${placeholderIndex}_TITLE}}`]) {
      placeholders[`{{EXPERIENCE_${placeholderIndex}_TITLE}}`] = "";
      placeholders[`{{EXPERIENCE_${placeholderIndex}_COMPANY}}`] = "";
      placeholders[`{{EXPERIENCE_${placeholderIndex}_WORK_TYPE_COUNTRY}}`] = "";
      placeholders[`{{EXPERIENCE_${placeholderIndex}_DATE}}`] = "";
    }

    Array.from({ length: count }, (_, bulletIndex) => bulletIndex + 1).forEach(
      (bulletNumber) => {
        const key = `{{EXPERIENCE_${placeholderIndex}_BULLET_${bulletNumber}}}`;

        if (!placeholders[key]) {
          placeholders[key] = getBulletValue(
            draft.experience,
            index,
            bulletNumber - 1,
          );
        }
      },
    );
  });

  return placeholders;
}
