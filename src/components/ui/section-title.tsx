type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({ eyebrow, title, description, align = "left" }: SectionTitleProps) {
  const aligned = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <header className={`mb-10 flex max-w-3xl flex-col gap-3 ${aligned}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="display-sm text-balance">{title}</h2>
      {description ? <p className="text-lg text-slate-600">{description}</p> : null}
    </header>
  );
}
