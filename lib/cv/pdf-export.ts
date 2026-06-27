import { mkdtemp, readFile, rm, writeFile, access } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { generateTailoredDocxBuffer } from "@/lib/cv/docx-template";
import type { CvTemplateDraft } from "@/lib/cv/docx-placeholders";

const execFileAsync = promisify(execFile);

const SOFFICE_CANDIDATE_PATHS = [
  process.env.LIBREOFFICE_PATH,
  "C:\\Program Files\\LibreOffice\\program\\soffice.com",
  "C:\\Program Files\\LibreOffice\\program\\soffice.exe",
  "C:\\Program Files (x86)\\LibreOffice\\program\\soffice.com",
  "C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe",
].filter((value): value is string => Boolean(value));

export class PdfExportError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PdfExportError";
  }
}

async function resolveSofficePath(): Promise<string> {
  for (const candidate of SOFFICE_CANDIDATE_PATHS) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      continue;
    }
  }

  throw new PdfExportError(
    "LibreOffice was not found. Install LibreOffice or set LIBREOFFICE_PATH.",
  );
}

export async function generateTailoredPdfBuffer(
  draft: CvTemplateDraft,
): Promise<Buffer> {
  const sofficePath = await resolveSofficePath();
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "applier-pdf-"));
  const docxPath = path.join(tempDir, "tailored-cv.docx");
  const pdfPath = path.join(tempDir, "tailored-cv.pdf");

  try {
    const docxBuffer = await generateTailoredDocxBuffer(draft);
    await writeFile(docxPath, docxBuffer);

    await execFileAsync(
      sofficePath,
      [
        "--headless",
        "--convert-to",
        "pdf",
        "--outdir",
        tempDir,
        docxPath,
      ],
      {
        windowsHide: true,
      },
    );

    try {
      return await readFile(pdfPath);
    } catch {
      throw new PdfExportError("LibreOffice did not produce the PDF file.");
    }
  } catch (error) {
    if (error instanceof PdfExportError) {
      throw error;
    }

    throw new PdfExportError(
      error instanceof Error ? error.message : "PDF export failed.",
    );
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}
