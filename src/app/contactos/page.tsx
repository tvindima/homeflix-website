import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { SectionTitle } from "@/components/ui/section-title";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contactos",
  description: "Canal institucional da Homeflix para contacto comercial e operacional.",
  path: "/contactos",
});

export default function ContactosPage() {
  return (
    <>
      <section className="hero-bg">
        <div className="container-wrap py-20">
          <p className="eyebrow">Contacto institucional</p>
          <h1 className="display-lg max-w-4xl text-balance">Fale com a equipa Homeflix</h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300">
            Para temas comerciais, institucionais ou operacionais, use os contactos abaixo ou envie o formulario.
          </p>
        </div>
      </section>

      <section className="section-wrap grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="panel panel-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Canais diretos</h2>
          <ul className="mt-4 space-y-3 text-slate-700">
            <li>Email: geral@homeflix.im</li>
            <li>Telefone: +351 000 000 000</li>
            <li>Horario de resposta: 09h00 - 19h00 (dias uteis)</li>
          </ul>
        </article>
        <article className="panel panel-dark">
          <SectionTitle title="Formulario de contacto" />
          <ContactForm />
        </article>
      </section>
    </>
  );
}
