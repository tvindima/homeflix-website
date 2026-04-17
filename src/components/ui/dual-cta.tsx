"use client";

import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/client-tracking";
import { useModal } from "@/components/modals/modal-provider";

type DualCtaProps = {
  primaryLabel?: string;
  secondaryLabel?: string;
  className?: string;
};

export function DualCta({
  primaryLabel = "Apresentar empreendimento",
  secondaryLabel = "Pedir acesso como parceiro",
  className = "",
}: DualCtaProps) {
  const pathname = usePathname();
  const { openModal } = useModal();

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <button
        type="button"
        className="btn-primary"
        onClick={() => {
          trackEvent({ event: "cta_apresentar_empreendimento", pathname, source: pathname });
          openModal("quickEmpreendimento");
        }}
      >
        {primaryLabel}
      </button>
      <button
        type="button"
        className="btn-secondary"
        onClick={() => {
          trackEvent({ event: "cta_pedir_acesso", pathname, source: pathname });
          openModal("quickAccess");
        }}
      >
        {secondaryLabel}
      </button>
    </div>
  );
}
