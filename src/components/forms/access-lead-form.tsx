"use client";

import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FormFeedback } from "@/components/forms/form-feedback";
import { InputField, TextAreaField } from "@/components/ui/input-field";
import { FormStatus } from "@/lib/forms";
import { trackEvent } from "@/lib/client-tracking";

type AccessLeadFormProps = {
  variant: "full" | "quick";
  sourcePage?: string;
  onSuccess?: () => void;
};

type ApiResponse = {
  ok: boolean;
  errors?: string[];
  warnings?: string[];
  message?: string;
  redirect?: string;
};

export function AccessLeadForm({ variant, sourcePage, onSuccess }: AccessLeadFormProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (dirty && status !== "success") {
        trackEvent({ event: "form_abandon", pathname, source: `acesso_${variant}` });
      }
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty, pathname, status, variant]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setErrors([]);
    setWarnings([]);

    trackEvent({ event: "form_submit_attempt", pathname, source: `acesso_${variant}` });

    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/leads/access", {
      method: "POST",
      body: formData,
    });

    const result = (await response.json()) as ApiResponse;

    if (!response.ok || !result.ok) {
      setStatus("error");
      setMessage(result.message || "Nao foi possivel submeter o pedido neste momento.");
      setErrors(result.errors || []);
      setWarnings(result.warnings || []);
      trackEvent({ event: "form_submit_error", pathname, source: `acesso_${variant}` });
      return;
    }

    setStatus("success");
    setMessage(result.message || "Recebemos o seu pedido. A candidatura encontra-se em analise.");
    setWarnings(result.warnings || []);
    trackEvent({ event: "form_submit_success", pathname, source: `acesso_${variant}` });

    if (onSuccess) {
      onSuccess();
    }

    if (result.redirect) {
      router.push(result.redirect);
    }
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} onChange={() => setDirty(true)}>
      <input type="hidden" name="sourcePage" value={sourcePage || pathname} />
      <input type="hidden" name="formVariant" value={variant} />
      <input type="text" name="website" className="hp-field" autoComplete="off" tabIndex={-1} />

      <div className="grid gap-4 md:grid-cols-2">
        <InputField name="nome" label="Nome completo" required placeholder="Nome e apelido" />
        <InputField name="telefone" label="Telefone" required placeholder="+351 ..." />
        <InputField name="email" label="Email profissional" type="email" required placeholder="nome@empresa.pt" />
        <InputField name="mediadora" label="Nome da mediadora" required placeholder="Nome da mediadora" />
        <InputField name="ami" label="N. AMI" required placeholder="AMI" />
        <InputField name="cargo" label="Funcao/Cargo" required placeholder="Consultor, diretor, coordenador" />
      </div>

      {variant === "full" ? (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <InputField name="zonaAtuacao" label="Zona de atuacao" placeholder="Ex.: Lisboa, Porto" />
            <InputField name="websiteProfissional" label="Website ou rede profissional" placeholder="https://..." />
            <InputField name="responsavelHierarquico" label="Responsavel hierarquico" placeholder="Nome" />
            <InputField name="contactoResponsavel" label="Contacto do responsavel" placeholder="Telefone/email" />
          </div>

          <TextAreaField name="mensagem" label="Mensagem" placeholder="Contexto comercial e tipo de produto que trabalha" />

          <label className="check-row">
            <input type="checkbox" name="declaracaoVeracidade" />
            <span>Declaro que os dados submetidos sao verdadeiros.</span>
          </label>

          <label className="form-row">
            <span className="form-label">Comprovativos (PDF, JPG, PNG, WEBP)</span>
            <input type="file" name="comprovativos" accept=".pdf,.png,.jpg,.jpeg,.webp" multiple className="form-input file:mr-3" />
            <span className="form-hint">Maximo 3 ficheiros e 5MB por ficheiro.</span>
          </label>
        </>
      ) : null}

      <label className="check-row">
        <input type="checkbox" name="consentimento" required />
        <span>Autorizo contacto da equipa Homeflix para avaliacao desta candidatura.</span>
      </label>

      <button className="btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "A submeter..." : "Enviar candidatura"}
      </button>

      <FormFeedback status={status} message={message} errors={errors} warnings={warnings} />
    </form>
  );
}
