"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useModal } from "@/components/modals/modal-provider";
import { AccessLeadForm } from "@/components/forms/access-lead-form";
import { EmpreendimentoLeadForm } from "@/components/forms/empreendimento-lead-form";
import { DemoForm } from "@/components/forms/demo-form";
import { trackEvent } from "@/lib/client-tracking";

export function ModalHost() {
  const pathname = usePathname();
  const { activeModal, closeModal, openModal } = useModal();

  useEffect(() => {
    if (!activeModal) return;
    trackEvent({ event: "modal_open", pathname, source: activeModal });
  }, [activeModal, pathname]);

  useEffect(() => {
    if (!activeModal) return;
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [activeModal, closeModal]);

  if (!activeModal) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={closeModal}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" aria-label="Fechar modal" onClick={closeModal}>
          Fechar
        </button>

        {activeModal === "quickAccess" ? (
          <>
            <h3 className="modal-title">Pedir acesso rapido</h3>
            <p className="modal-copy">Submeta os dados essenciais. A equipa Homeflix valida a candidatura.</p>
            <AccessLeadForm
              variant="quick"
              sourcePage={pathname}
              onSuccess={() => {
                closeModal();
                openModal("submitted");
              }}
            />
          </>
        ) : null}

        {activeModal === "quickEmpreendimento" ? (
          <>
            <h3 className="modal-title">Apresentar empreendimento</h3>
            <p className="modal-copy">Partilhe os dados minimos e será contactado pela equipa comercial.</p>
            <EmpreendimentoLeadForm
              variant="quick"
              sourcePage={pathname}
              onSuccess={() => {
                closeModal();
                openModal("submitted");
              }}
            />
          </>
        ) : null}

        {activeModal === "demo" ? (
          <>
            <h3 className="modal-title">Marcar demonstracao</h3>
            <p className="modal-copy">Agende uma sessao comercial para conhecer a operacao Homeflix.</p>
            <DemoForm
              onSuccess={() => {
                closeModal();
                openModal("submitted");
              }}
            />
          </>
        ) : null}

        {activeModal === "restricted" ? (
          <>
            <h3 className="modal-title">Acesso restrito</h3>
            <p className="modal-copy">
              A Homeflix e uma plataforma de acesso validado, reservada a profissionais reais do setor imobiliario e a entidades
              com enquadramento comercial adequado.
            </p>
            <button
              className="btn-primary"
              type="button"
              onClick={() => {
                openModal("quickAccess");
              }}
            >
              Pedir acesso
            </button>
          </>
        ) : null}

        {activeModal === "submitted" ? (
          <>
            <h3 className="modal-title">Candidatura submetida</h3>
            <p className="modal-copy">
              Recebemos o seu pedido. A candidatura sera analisada pela equipa Homeflix. O acesso so sera concedido apos
              validacao.
            </p>
            <button className="btn-primary" type="button" onClick={closeModal}>
              Fechar
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
