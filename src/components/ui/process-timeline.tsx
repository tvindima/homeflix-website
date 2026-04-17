export function ProcessTimeline({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step} className="timeline-step">
          <span className="timeline-index">{index + 1}</span>
          <p className="text-slate-100">{step}</p>
        </li>
      ))}
    </ol>
  );
}
