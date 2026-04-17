import type { Metadata } from "next";
import { DemoForm } from "@/components/forms/demo-form";
import { SectionTitle } from "@/components/ui/section-title";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Marcar Demonstracao",
  description: "Agendar demonstracao comercial da operacao Homeflix.",
  path: "/demo",
});

export default function DemoPage() {
  return (
    <>
      <section className="hero-bg">
        <div className="container-wrap py-20">
          <p className="eyebrow">Demonstracao comercial</p>
          <h1 className="display-lg max-w-4xl text-balance">Marcar sessao de demonstracao Homeflix</h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300">
            Sessao orientada para promotores, construtores e parceiros imobiliarios com enquadramento profissional.
          </p>
        </div>
      </section>

      <section className="section-wrap section-dark">
        <SectionTitle title="Pedido de demonstracao" />
        <DemoForm />
      </section>
    </>
  );
}
