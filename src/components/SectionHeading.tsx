import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, intro, align = "left" }: { eyebrow?: string; title: string; intro?: ReactNode; align?: "left" | "center" }) {
  return <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
    {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
    <h2 className="display mt-3 text-4xl font-extrabold text-brand-navy sm:text-5xl">{title}</h2>
    {intro ? <div className="mt-5 text-lg leading-relaxed text-brand-ink/75">{intro}</div> : null}
  </div>;
}
