import { readFile } from "node:fs/promises";
import path from "node:path";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import {
  buildDocxPlaceholderMap,
  type CvTemplateDraft,
  type DocxPlaceholderMap,
} from "@/lib/cv/docx-placeholders";

const DOCX_TEMPLATE_PATH = path.join(
  process.cwd(),
  "docs",
  "Asim Alizada - CV - placeholder.docx",
);

function toDocxtemplaterData(
  placeholders: DocxPlaceholderMap,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(placeholders).map(([key, value]) => [
      key.replace(/^\{\{/, "").replace(/\}\}$/, ""),
      value,
    ]),
  );
}

export async function generateTailoredDocxBuffer(
  draft: CvTemplateDraft,
): Promise<Buffer> {
  const templateBuffer = await readFile(DOCX_TEMPLATE_PATH);
  const zip = new PizZip(templateBuffer);
  const doc = new Docxtemplater(zip, {
    linebreaks: true,
    paragraphLoop: true,
    delimiters: {
      start: "{{",
      end: "}}",
    },
  });

  doc.render(toDocxtemplaterData(buildDocxPlaceholderMap(draft)));

  return doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
}
