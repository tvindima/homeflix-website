import { randomUUID } from "node:crypto";
import { appendRecord } from "@/lib/server/fs-db";
import { allowRequest } from "@/lib/server/rate-limit";
import { getClientIp, getUserAgent } from "@/lib/server/request";
import { errorJson, okJson } from "@/lib/server/response";
import { isValidEmail, isValidPhone, normalizeString } from "@/lib/forms";
import { sendAutoReplyEmail, sendInternalLeadEmail } from "@/lib/server/email";

export async function POST(request: Request) {
  const ip = await getClientIp();
  const userAgent = await getUserAgent();

  if (!allowRequest(`lead:demo:${ip}`, 8, 60_000)) {
    return errorJson(429, "Demasiados pedidos. Tente novamente em instantes.");
  }

  const formData = await request.formData();

  const payload = {
    sourcePage: normalizeString(formData.get("sourcePage")) || "/demo",
    honeypot: normalizeString(formData.get("website")),
    nome: normalizeString(formData.get("nome")),
    empresa: normalizeString(formData.get("empresa")),
    email: normalizeString(formData.get("email")),
    telefone: normalizeString(formData.get("telefone")),
    tipoInteresse: normalizeString(formData.get("tipoInteresse")),
    mensagem: normalizeString(formData.get("mensagem")),
  };

  const errors: string[] = [];
  if (!payload.nome) errors.push("Nome e obrigatorio.");
  if (!payload.empresa) errors.push("Empresa e obrigatoria.");
  if (!isValidEmail(payload.email)) errors.push("Email invalido.");
  if (!isValidPhone(payload.telefone)) errors.push("Telefone invalido.");
  if (!payload.tipoInteresse) errors.push("Tipo de interesse e obrigatorio.");
  if (!payload.mensagem) errors.push("Mensagem e obrigatoria.");

  if (errors.length > 0) {
    return errorJson(400, "Valide os dados e tente novamente.", errors);
  }

  if (payload.honeypot) {
    return okJson({ message: "Recebido." });
  }

  const leadId = `DEM-${randomUUID()}`;
  const record = {
    ...payload,
    leadId,
    leadType: "demo",
    status: "novo",
    createdAt: new Date().toISOString(),
    ip,
    userAgent,
    honeypot: undefined,
  };

  await appendRecord("leads_demo", record);
  await sendInternalLeadEmail({
    category: "demo",
    leadId,
    sourcePage: payload.sourcePage,
    payload: record,
  });
  await sendAutoReplyEmail({
    to: payload.email,
    name: payload.nome,
    category: "demo",
  });

  return okJson({ message: "Pedido de demonstracao recebido. A equipa Homeflix entrara em contacto." });
}
