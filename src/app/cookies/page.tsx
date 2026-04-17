import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Politica de Cookies",
  description: "Informacao sobre cookies e tecnologias de medicao utilizadas no website Homeflix.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <section className="section-wrap legal-copy">
      <h1>Politica de Cookies</h1>
      <p>
        O website Homeflix pode utilizar cookies tecnicos e de analise para funcionamento, seguranca, medicao de interacoes e
        melhoria da experiencia.
      </p>
      <h2>1. Cookies estritamente necessarios</h2>
      <p>Garantem funcionamento basico de navegacao, formularios e seguranca operacional.</p>
      <h2>2. Cookies de analise</h2>
      <p>Permitem medir page views, interacoes com CTAs, eventos de modal e submissoes de formularios.</p>
      <h2>3. Gestao de preferencias</h2>
      <p>O utilizador pode gerir cookies no browser. Desativacao pode afetar funcionalidades do website.</p>
    </section>
  );
}
