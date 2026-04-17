import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Building2, Files, KeyRound, Network, Shield, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { ComparisonBlock } from "@/components/ui/comparison-block";
import { PartnersRendersShowcase } from "@/components/ui/partners-renders-showcase";
import { SectionTitle } from "@/components/ui/section-title";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "A nova infraestrutura de partilha imobiliaria",
  description:
    "A Homeflix organiza empreendimentos, fracoes e oportunidades num ambiente profissional com partilha obrigatoria, rastreabilidade e acesso controlado.",
  path: "/",
});

const featureStrip = [
  {
    icon: Network,
    title: "28 Orgs Parceiras Ativas",
    text: "69 parceiros registados, 61 ativos e 8 pendentes.",
  },
  {
    icon: Files,
    title: "487 Documentos Validos",
    text: "319 de acesso partner e 168 de acesso publico.",
  },
  {
    icon: Shield,
    title: "22.547 Eventos Auditados",
    text: "22.147 atividades registadas nos ultimos 30 dias.",
  },
  {
    icon: TrendingUp,
    title: "319 Fracoes Disponiveis",
    text: "501 fracoes totais, com 182 ja reservadas.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="container-wrap home-hero-inner">
          <div className="home-copy-col">
            <span className="home-access-tag">ACESSO RESTRITO A PROFISSIONAIS VALIDADOS</span>

            <h1 className="home-title">
              A nova <span>infraestrutura</span>
              <br />
              de partilha imobiliaria.
            </h1>

            <p className="home-lead-copy">
              A Homeflix opera com 12 empreendimentos publicos, 501 fracoes e 487 documentos validos em producao, com
              rastreabilidade total e acesso controlado a parceiros imobiliarios.
            </p>

            <p className="mt-3 text-sm text-sky-200/85">
              Snapshot tecnico: 17/04/2026 19:50 (Europe/Lisbon) | Fonte: base de dados de producao (Railway), modo read-only.
            </p>

            <div className="home-brand-lockup">
              <Image
                src="/homeflix-logo-legacy-root.png"
                alt="Homeflix - Plataforma global de partilhas imobiliarias"
                width={460}
                height={412}
                className="hero-official-logo"
                priority
              />
            </div>

            <p className="home-institutional-copy">
              Criada pela CRMPLUS, com rigor tecnico e profissional assegurado por Imoveis+ | AMI 17195.
            </p>

            <div className="home-cta-row">
              <Link href="/empreendimento" className="btn-primary home-main-btn">
                SOU PROMOTOR / CONSTRUTOR
              </Link>
              <Link href="/acesso" className="btn-secondary home-main-btn">
                QUERO SER PARCEIRO
              </Link>
            </div>
          </div>

          <div className="home-visual-col" aria-hidden>
            <article className="metric-card metric-one">
              <Users size={32} strokeWidth={1.9} />
              <div>
                <strong>61</strong>
                <span>Parceiros Ativos</span>
              </div>
            </article>

            <article className="metric-card metric-two">
              <Building2 size={30} strokeWidth={1.9} />
              <div>
                <strong>12</strong>
                <span>Empreendimentos Publicos</span>
              </div>
            </article>

            <article className="metric-card metric-three">
              <KeyRound size={30} strokeWidth={1.9} />
              <div>
                <strong>501</strong>
                <span>Fracoes em Comercializacao</span>
              </div>
            </article>

            <article className="floating-note-card">
              <ShieldCheck size={30} strokeWidth={1.9} />
              <h3>22.147</h3>
              <p>Atividades nos ultimos 30 dias (auditoria real).</p>
            </article>
          </div>
        </div>

        <div className="home-feature-strip">
          <div className="container-wrap home-feature-grid">
            {featureStrip.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="feature-item">
                  <Icon size={34} strokeWidth={1.8} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <PartnersRendersShowcase />

      <section className="section-wrap">
        <SectionTitle
          title="O mercado continua a vender abaixo do seu potencial."
          description="Empreendimentos novos continuam a depender de circuitos curtos, partilhas informais, informacao dispersa e alcance comercial limitado."
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Distribuicao curta",
            "Informacao incompleta",
            "Tempo perdido",
            "Partilhas sem controlo",
            "Oportunidades que morrem cedo",
            "Dependencia excessiva de canais locais",
          ].map((item) => (
            <div key={item} className="chip-soft">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap section-dark">
        <SectionTitle title="Isto nao e um portal de anuncios." />
        <ComparisonBlock />
      </section>

      <section className="section-wrap text-center">
        <SectionTitle
          align="center"
          title="Se tem produto, precisa de melhor distribuicao. Se tem clientes, precisa de melhor acesso."
        />
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/empreendimento" className="btn-primary">
            Apresentar empreendimento
          </Link>
          <Link href="/acesso" className="btn-secondary">
            Pedir acesso como parceiro
          </Link>
        </div>
      </section>
    </>
  );
}
