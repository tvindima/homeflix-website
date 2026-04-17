export function ComparisonBlock() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <article className="panel panel-soft">
        <h3 className="text-lg font-semibold text-slate-900">Portais</h3>
        <ul className="mt-3 space-y-2 text-slate-600">
          <li>Vendem anuncios</li>
          <li>Vendem visualizacoes</li>
          <li>Vendem destaque</li>
          <li>Vivem de trafego</li>
        </ul>
      </article>
      <article className="panel panel-dark">
        <h3 className="text-lg font-semibold text-slate-100">Homeflix</h3>
        <ul className="mt-3 space-y-2 text-slate-200">
          <li>Estrutura oportunidades</li>
          <li>Distribui produto</li>
          <li>Valida parceiros</li>
          <li>Opera em partilha</li>
          <li>Vive de negocio real</li>
        </ul>
      </article>
    </div>
  );
}
