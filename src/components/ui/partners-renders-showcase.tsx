import Image from "next/image";
import { Monitor, Smartphone } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";

const desktopScreens = [
  {
    src: "/partners-renders/partners-desktop-overview-1.png",
    alt: "Portal de parceiros em desktop com listagem de empreendimentos por regiao.",
    label: "Empreendimentos por regiao",
    featured: true,
  },
  {
    src: "/partners-renders/partners-desktop-overview-2.png",
    alt: "Portal de parceiros em desktop com continuidade da grelha de empreendimentos.",
    label: "Cobertura de projeto",
  },
  {
    src: "/partners-renders/partners-desktop-fractions.png",
    alt: "Portal de parceiros em desktop na vista de fracoes por empreendimento.",
    label: "Tabela de fracoes",
  },
  {
    src: "/partners-renders/partners-desktop-documents.png",
    alt: "Portal de parceiros em desktop na aba de documentos.",
    label: "Centro documental",
  },
  {
    src: "/partners-renders/partners-desktop-gallery.png",
    alt: "Portal de parceiros em desktop na aba de galeria de imagens.",
    label: "Galeria e media",
  },
];

const mobileScreens = [
  {
    src: "/partners-renders/partners-mobile-overview.jpeg",
    alt: "Portal de parceiros em mobile na home de empreendimentos.",
    label: "Home mobile",
  },
  {
    src: "/partners-renders/partners-mobile-cards.jpeg",
    alt: "Portal de parceiros em mobile com cards de empreendimentos.",
    label: "Cards de projeto",
  },
  {
    src: "/partners-renders/partners-mobile-fractions.jpeg",
    alt: "Portal de parceiros em mobile na listagem de fracoes.",
    label: "Fracoes e filtros",
  },
  {
    src: "/partners-renders/partners-mobile-gallery.jpeg",
    alt: "Portal de parceiros em mobile na galeria de imagens.",
    label: "Galeria mobile",
  },
  {
    src: "/partners-renders/partners-mobile-documents.jpeg",
    alt: "Portal de parceiros em mobile com documentos e downloads.",
    label: "Documentos",
  },
  {
    src: "/partners-renders/partners-mobile-unit.jpeg",
    alt: "Portal de parceiros em mobile com detalhe de fracao.",
    label: "Detalhe da fracao",
  },
];

export function PartnersRendersShowcase() {
  const featuredDesktop = desktopScreens.find((screen) => screen.featured) ?? desktopScreens[0];
  const secondaryDesktop = desktopScreens.filter((screen) => screen.src !== featuredDesktop.src);

  return (
    <section className="section-wrap partners-renders-section">
      <SectionTitle
        eyebrow="Portal de Parceiros"
        title="Renders reais da plataforma em desktop e mobile."
        description="Visao de uso real da extranet de parceiros, com navegacao por empreendimentos, fracoes, galeria e documentos."
      />

      <div className="partners-renders-layout">
        <article className="partners-panel partners-panel-desktop">
          <header className="partners-panel-head">
            <Monitor size={18} strokeWidth={1.8} />
            <span>Perspetiva Desktop</span>
          </header>

          <figure className="partners-desktop-main">
            <Image
              src={featuredDesktop.src}
              alt={featuredDesktop.alt}
              fill
              sizes="(max-width: 1190px) 100vw, 58vw"
              className="partners-shot-image"
            />
            <figcaption>{featuredDesktop.label}</figcaption>
          </figure>

          <div className="partners-desktop-grid">
            {secondaryDesktop.map((screen) => (
              <figure key={screen.src} className="partners-desktop-card">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  fill
                  sizes="(max-width: 1190px) 50vw, 28vw"
                  className="partners-shot-image"
                />
                <figcaption>{screen.label}</figcaption>
              </figure>
            ))}
          </div>
        </article>

        <article className="partners-panel partners-panel-mobile">
          <header className="partners-panel-head">
            <Smartphone size={18} strokeWidth={1.8} />
            <span>Perspetiva Mobile</span>
          </header>

          <div className="partners-mobile-rail" role="list" aria-label="Renders mobile do portal de parceiros">
            {mobileScreens.map((screen) => (
              <figure key={screen.src} className="partners-mobile-device" role="listitem">
                <div className="partners-mobile-screen">
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    fill
                    sizes="(max-width: 1190px) 42vw, 18vw"
                    className="partners-shot-image"
                  />
                </div>
                <figcaption>{screen.label}</figcaption>
              </figure>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
