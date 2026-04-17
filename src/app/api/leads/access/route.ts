import { randomUUID } from "node:crypto";
import { appendRecord, persistUploads } from "@/lib/server/fs-db";
import { allowRequest } from "@/lib/server/rate-limit";
import { validateAccessLead } from "@/lib/server/form-validators";
import { getClientIp, getUserAgent } from "@/lib/server/request";
import { errorJson, okJson } from "@/lib/server/response";
import { sendAutoReplyEmail, sendInternalLeadEmail } from "@/lib/server/email";

const allowedFileTypes = new Set(["application/pdf", "image/png", "image/jpeg", "image/webp"]);
const maxFileSize = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const ip = await getClientIp();
  const userAgent = await getUserAgent();

  if (!allowRequest(`lead:acesso:${ip}`, 8, 60_000)) {
    return errorJson(429, "Demasiados pedidos. Tente novamente em instantes.");
  }

  const formData = await request.formData();
  const parsed = validateAccessLead(formData);

  if (!parsed.ok) {
    return errorJson(400, "Valide os dados e tente novamente.", parsed.errors);
  }

  if (parsed.data.honeypot) {
    return okJson({ message: "Recebido." });
  }

  const allUploads = formData.getAll("comprovativos").filter((value): value is File => value instanceof File && value.size > 0);
  if (allUploads.length > 3) {
    return errorJson(400, "Maximo de 3 ficheiros por submissao.");
  }

  for (const file of allUploads) {
    if (!allowedFileTypes.has(file.type)) {
      return errorJson(400, "Tipo de ficheiro invalido. Use PDF, PNG, JPG ou WEBP.");
    }
    if (file.size > maxFileSize) {
      return errorJson(400, "Cada ficheiro deve ter no maximo 5MB.");
    }
  }

  const leadId = `ACC-${randomUUID()}`;
  const uploadedPaths = await persistUploads(leadId, allUploads);

  const payload = {
    leadId,
    leadType: "acesso",
    status: "em_analise",
    createdAt: new Date().toISOString(),
    ip,
    userAgent,
    ...parsed.data,
    honeypot: undefined,
    uploadedPaths,
  };

  await appendRecord("leads_access", payload);
  await sendInternalLeadEmail({
    category: "acesso",
    leadId,
    sourcePage: parsed.data.sourcePage,
    payload,
  });
  await sendAutoReplyEmail({
    to: parsed.data.email,
    name: parsed.data.nome,
    category: "acesso",
  });

  return okJson({
    message: "Recebemos o seu pedido. A candidatura sera analisada pela equipa Homeflix.",
    redirect: parsed.data.formVariant === "full" ? "/obrigado-acesso" : undefined,
    warnings: parsed.warnings || [],
  });
}
