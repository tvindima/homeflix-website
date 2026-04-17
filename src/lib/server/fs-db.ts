import path from "node:path";
import { mkdir, writeFile, appendFile } from "node:fs/promises";

const dataRoot = path.join(process.cwd(), "data");

async function ensureDataDir(): Promise<void> {
  await mkdir(dataRoot, { recursive: true });
}

export async function appendRecord(fileName: string, record: unknown): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(dataRoot, `${fileName}.jsonl`);
  await appendFile(filePath, `${JSON.stringify(record)}\n`, "utf-8");
}

function sanitizeFileName(fileName: string): string {
  const normalized = fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
  return normalized.slice(0, 120) || "ficheiro";
}

export async function persistUploads(leadId: string, files: File[]): Promise<string[]> {
  if (files.length === 0) return [];

  await ensureDataDir();
  const uploadDir = path.join(dataRoot, "uploads", leadId);
  await mkdir(uploadDir, { recursive: true });

  const savedPaths: string[] = [];
  for (const file of files) {
    const safeName = sanitizeFileName(file.name);
    const absolutePath = path.join(uploadDir, safeName);
    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(absolutePath, bytes);
    savedPaths.push(absolutePath);
  }

  return savedPaths;
}
