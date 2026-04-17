"use client";

import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FormFeedback } from "@/components/forms/form-feedback";
import { InputField, TextAreaField } from "@/components/ui/input-field";
import { FormStatus } from "@/lib/forms";
import { trackEvent } from "@/lib/client-tracking";

type EmpreendimentoLeadFormProps = {
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

export function EmpreendimentoLeadForm({ variant, sourcePage, onSuccess }: EmpreendimentoLeadFormProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (dirty && status !== "success") {
        trackEvent({ event: "form_abandon", pathname, source: `empreendimento_${variant}` });
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

    trackEvent({ event: "form_submit_attempt", pathname, source: `empreendimento_${variant}` });

    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/leads/empreendimento", {
      method: "POST",
      body: formData,
    });

    const result = (await response.json()) as ApiResponse;

    if (!response.ok || !result.ok) {
      setStatus("error");
      setMessage(result.message || "Nao foi possivel submeter o pedido neste momento.");
      setErrors(result.errors || []);
      trackEvent({ event: "form_submit_error", pathname, source: `empreendimento_${variant}` });
      return;
    }

    setStatus("success");
    setMessage(result.message || "Recebemos o seu pedido. A equipa Homeflix ira responder em breve.");
    trackEvent({ event: "form_submit_success", pathname, source: `empreendimento_${variant}` });

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
        <InputField name="nome" label="Nome" required />
        <InputField name="empresa" label="Empresa" required />
        <InputField name="cargo" label="Cargo" required />
        <InputField name="telefone" label="Telefone" required />
        <InputField name="email" label="Email" type="email" required />
        <InputField name="empreendimento" label="Nome do empreendimento" required />
        <InputField name="localizacao" label="Localizacao" required />
        <InputField name="fracoes" label="N. de fracoes" required />
      </div>

      {variant === "full" ? (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <InputField name="faseProjeto" label="Fase do projeto" placeholder="Licenciamento, construcao, comercializacao" />
            <InputField name="estadoObra" label="Estado da obra" required placeholder="Em construcao, concluida, etc." />
            <InputField name="prazoConclusao" label="Prazo estimado de conclusao" placeholder="MM/AAAA" />
            <InputField name="tipoProduto" label="Tipo de produto" placeholder="Residencial, misto, premium" />
          </div>

          <InputField name="linksDocumentos" label="Link para documentos" placeholder="https://..." />
          <TextAreaField name="mensagem" label="Mensagem" placeholder="Detalhes comerciais e objetivos de distribuicao" />
        </>
      ) : (
        <InputField name="estadoObra" label="Estado da obra" required placeholder="Ex.: em construcao" />
      )}

      <label className="check-row">
        <input type="checkbox" name="consentimento" required />
        <span>Autorizo contacto comercial da equipa Homeflix.</span>
      </label>

      <button className="btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "A submeter..." : "Ser contactado"}
      </button>

      <FormFeedback status={status} message={message} errors={errors} />
    </form>
  );
}
