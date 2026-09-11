import type { ReactNode } from "react";

export function FeatureBand({ children }: { children: ReactNode }) {
  return <section className="feature-band" aria-label="Vorteile auf einen Blick"><div className="page-shell feature-band-grid">{children}</div></section>;
}

export function FeatureItem({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <div className="feature-item"><div className="feature-icon" aria-hidden="true">{icon}</div><div><h3>{title}</h3><p>{text}</p></div></div>;
}
