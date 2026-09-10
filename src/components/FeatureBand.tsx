import type { ReactNode } from "react";

export function FeatureBand({ children }: { children: ReactNode }) {
  return <section className="bg-brand-navy text-white"><div className="page-shell grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">{children}</div></section>;
}

export function FeatureItem({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <div className="border-l border-white/20 pl-4"><div className="text-brand-lime">{icon}</div><p className="mt-3 font-display text-xl font-bold leading-none">{title}</p><p className="mt-2 text-sm text-white/70">{text}</p></div>;
}
