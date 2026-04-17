import Link from "next/link";

export function AudienceSplit() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <article className="panel panel-dark">
        <p className="eyebrow">Promotores / Construtores</p>
        <h3 className="text-2xl font-semibold text-slate-100">Para quem tem produto para vender</h3>
        <p className="mt-3 text-slate-300">
          Coloque empreendimentos em exclusivo numa maquina de distribuicao seria, organizada e escalavel.
        </p>
        <Link className="btn-primary mt-6 inline-flex" href="/empreendimento">
          Falar sobre empreendimento
        </Link>
      </article>
      <article className="panel panel-soft">
        <p className="eyebrow">Parceiros Imobiliarios</p>
        <h3 className="text-2xl font-semibold text-slate-900">Para quem tem clientes para servir</h3>
        <p className="mt-3 text-slate-600">
          Aceda a produto novo estruturado, pronto a apresentar e trabalhar com compradores reais.
        </p>
        <Link className="btn-secondary mt-6 inline-flex" href="/acesso">
          Pedir acesso
        </Link>
      </article>
    </div>
  );
}
