import { boolFromForm, isProfessionalEmail, isValidEmail, isValidPhone, normalizeString } from "@/lib/forms";

export type ValidationResult<T> =
  | { ok: true; data: T; warnings?: string[] }
  | { ok: false; errors: string[] };

type BaseLead = {
  sourcePage: string;
  formVariant: "full" | "quick";
  honeypot: string;
};

type AccessLead = BaseLead & {
  nome: string;
  telefone: string;
  email: string;
  mediadora: string;
  ami: string;
  cargo: string;
  zonaAtuacao?: string;
  websiteProfissional?: string;
  responsavelHierarquico?: string;
  contactoResponsavel?: string;
  mensagem?: string;
  consentimento: boolean;
  declaracaoVeracidade: boolean;
};

type EmpreendimentoLead = BaseLead & {
  nome: string;
  empresa: string;
  cargo: string;
  telefone: string;
  email: string;
  empreendimento: string;
  localizacao: string;
  fracoes: string;
  faseProjeto?: string;
  estadoObra: string;
  prazoConclusao?: string;
  tipoProduto?: string;
  linksDocumentos?: string;
  mensagem?: string;
  consentimento: boolean;
};

type ContactLead = {
  sourcePage: string;
  honeypot: string;
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
};

export function validateAccessLead(formData: FormData): ValidationResult<AccessLead> {
  const errors: string[] = [];
  const warnings: string[] = [];

  const data: AccessLead = {
    sourcePage: normalizeString(formData.get("sourcePage")) || "/acesso",
    formVariant: (normalizeString(formData.get("formVariant")) === "quick" ? "quick" : "full") as "full" | "quick",
    honeypot: normalizeString(formData.get("website")),
    nome: normalizeString(formData.get("nome")),
    telefone: normalizeString(formData.get("telefone")),
    email: normalizeString(formData.get("email")),
    mediadora: normalizeString(formData.get("mediadora")),
    ami: normalizeString(formData.get("ami")),
    cargo: normalizeString(formData.get("cargo")),
    zonaAtuacao: normalizeString(formData.get("zonaAtuacao")),
    websiteProfissional: normalizeString(formData.get("websiteProfissional")),
    responsavelHierarquico: normalizeString(formData.get("responsavelHierarquico")),
    contactoResponsavel: normalizeString(formData.get("contactoResponsavel")),
    mensagem: normalizeString(formData.get("mensagem")),
    consentimento: boolFromForm(formData.get("consentimento")),
    declaracaoVeracidade: boolFromForm(formData.get("declaracaoVeracidade")),
  };

  if (!data.nome) errors.push("Nome completo e obrigatorio.");
  if (!isValidPhone(data.telefone)) errors.push("Telefone invalido.");
  if (!isValidEmail(data.email)) errors.push("Email invalido.");
  if (!data.mediadora) errors.push("Nome da mediadora e obrigatorio.");
  if (!data.ami) errors.push("Numero AMI e obrigatorio.");
  if (!data.cargo) errors.push("Funcao/cargo e obrigatorio.");

  if (!data.consentimento) {
    errors.push("Precisa de aceitar o consentimento para submeter.");
  }

  if (data.formVariant === "full" && !data.declaracaoVeracidade) {
    errors.push("Precisa de declarar veracidade dos dados.");
  }

  if (!isProfessionalEmail(data.email)) {
    warnings.push("Email pessoal detetado; email profissional e preferencial.");
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data, warnings };
}

export function validateEmpreendimentoLead(formData: FormData): ValidationResult<EmpreendimentoLead> {
  const errors: string[] = [];

  const data: EmpreendimentoLead = {
    sourcePage: normalizeString(formData.get("sourcePage")) || "/empreendimento",
    formVariant: (normalizeString(formData.get("formVariant")) === "quick" ? "quick" : "full") as "full" | "quick",
    honeypot: normalizeString(formData.get("website")),
    nome: normalizeString(formData.get("nome")),
    empresa: normalizeString(formData.get("empresa")),
    cargo: normalizeString(formData.get("cargo")),
    telefone: normalizeString(formData.get("telefone")),
    email: normalizeString(formData.get("email")),
    empreendimento: normalizeString(formData.get("empreendimento")),
    localizacao: normalizeString(formData.get("localizacao")),
    fracoes: normalizeString(formData.get("fracoes")),
    faseProjeto: normalizeString(formData.get("faseProjeto")),
    estadoObra: normalizeString(formData.get("estadoObra")),
    prazoConclusao: normalizeString(formData.get("prazoConclusao")),
    tipoProduto: normalizeString(formData.get("tipoProduto")),
    linksDocumentos: normalizeString(formData.get("linksDocumentos")),
    mensagem: normalizeString(formData.get("mensagem")),
    consentimento: boolFromForm(formData.get("consentimento")),
  };

  if (!data.nome) errors.push("Nome e obrigatorio.");
  if (!data.empresa) errors.push("Empresa e obrigatoria.");
  if (!data.cargo) errors.push("Cargo e obrigatorio.");
  if (!isValidPhone(data.telefone)) errors.push("Telefone invalido.");
  if (!isValidEmail(data.email)) errors.push("Email invalido.");
  if (!data.empreendimento) errors.push("Nome do empreendimento e obrigatorio.");
  if (!data.localizacao) errors.push("Localizacao e obrigatoria.");
  if (!data.fracoes) errors.push("Numero de fracoes e obrigatorio.");
  if (!data.estadoObra) errors.push("Estado da obra e obrigatorio.");
  if (!data.consentimento) errors.push("Precisa de aceitar o consentimento para submeter.");

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data };
}

export function validateContactLead(formData: FormData): ValidationResult<ContactLead> {
  const errors: string[] = [];

  const data: ContactLead = {
    sourcePage: normalizeString(formData.get("sourcePage")) || "/contactos",
    honeypot: normalizeString(formData.get("website")),
    nome: normalizeString(formData.get("nome")),
    email: normalizeString(formData.get("email")),
    telefone: normalizeString(formData.get("telefone")),
    assunto: normalizeString(formData.get("assunto")),
    mensagem: normalizeString(formData.get("mensagem")),
  };

  if (!data.nome) errors.push("Nome e obrigatorio.");
  if (!isValidEmail(data.email)) errors.push("Email invalido.");
  if (!isValidPhone(data.telefone)) errors.push("Telefone invalido.");
  if (!data.assunto) errors.push("Assunto e obrigatorio.");
  if (!data.mensagem) errors.push("Mensagem e obrigatoria.");

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data };
}
