import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, Building2, CalendarClock, MapPin } from "lucide-react";
import { getEmpreendimentoBySlug, empreendimentos } from "@/content/empreendimentos";
import { ProjectGalleryCarousel } from "@/components/ui/project-gallery-carousel";
import { ProjectInterestForm } from "@/components/forms/project-interest-form";
import { buildPageMetadata } from "@/lib/site-metadata";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return empreendimentos.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getEmpreendimentoBySlug(slug);

  if (!project) {
    return buildPageMetadata({
      title: "Empreendimento",
      description: "Detalhe de empreendimento Homeflix.",
      path: `/empreendimentos/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${project.nome} | Empreendimento`,
    description: `Detalhe comercial do empreendimento ${project.nome} com galeria e pedido de contacto.`,
    path: `/empreendimentos/${slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getEmpreendimentoBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="hero-bg">
        <div className="container-wrap py-16">
          <Link href="/empreendimentos" className="mb-5 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200">
            <ArrowLeft size={16} />
            Voltar aos empreendimentos
          </Link>

          <p className="eyebrow">Detalhe de empreendimento</p>
          <h1 className="display-md mt-2 max-w-4xl text-balance">{project.nome}</h1>
          <p className="mt-3 inline-flex items-center gap-2 text-lg text-slate-300">
            <MapPin size={18} /> {project.localizacao} - {project.regiao}
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="chip-dark">
              <strong className="block text-2xl text-slate-100">{project.totalFracoes}</strong>
              Fracoes totais
            </div>
            <div className="chip-dark">
              <strong className="block text-2xl text-emerald-300">{project.fracoesDisponiveis}</strong>
              Fracoes disponiveis
            </div>
            <div className="chip-dark">
              <strong className="block text-2xl text-amber-300">{project.fracoesReservadas}</strong>
              Fracoes reservadas
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="space-y-5">
            <ProjectGalleryCarousel projectName={project.nome} images={project.galeria} />

            <article className="panel panel-dark space-y-4">
              <h2 className="text-2xl font-semibold text-slate-100">Resumo operacional</h2>
              <p className="text-slate-300">{project.resumo}</p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-sm text-slate-200">
                  <p className="inline-flex items-center gap-2 font-medium text-cyan-300">
                    <CalendarClock size={16} /> {project.previsaoComercial}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-sm text-slate-300">
                  <p className="inline-flex items-center gap-2">
                    <Building2 size={16} /> Atualizado em {project.atualizadoEm}
                  </p>
                </div>
              </div>

              <ul className="grid gap-2">
                {project.destaques.map((item) => (
                  <li key={item} className="inline-flex items-start gap-2 text-slate-200">
                    <BadgeCheck size={18} className="mt-0.5 text-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <aside className="space-y-3">
            <div className="panel panel-dark">
              <p className="eyebrow">Saber mais</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-100">Pedir contacto sobre este empreendimento</h2>
              <p className="mt-2 text-sm text-slate-300">
                Preencha os seus dados e a equipa comercial entra em contacto consigo para apresentar mais informacao.
              </p>
            </div>

            <ProjectInterestForm projectName={project.nome} />
          </aside>
        </div>
      </section>
    </>
  );
}
