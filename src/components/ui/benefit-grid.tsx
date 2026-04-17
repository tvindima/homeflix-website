type BenefitItem = {
  title: string;
  description: string;
};

export function BenefitGrid({ items }: { items: BenefitItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className="panel">
          <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
        </article>
      ))}
    </div>
  );
}
