import type { ReactNode } from "react";

export function FeatureBand({ children }: { children: ReactNode }) {
  return <section className="bg-brand-navy text-white"><div className="page-shell grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">{children}</div></section>;
}

export function FeatureItem({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <div className="flex items-start gap-3"><div className="shrink-0 text-brand-lime" aria-hidden="true">{icon}</div><div><p className="font-display text-xl font-bold leading-tight">{title}</p><p className="mt-2 text-sm text-white/80">{text}</p></div></div>;
}
