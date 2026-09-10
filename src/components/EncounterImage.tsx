import Image from "next/image";

export function EncounterImage({ label, variant = "classroom", className = "", preload = false }: { label: string; variant?: "classroom" | "craft"; className?: string; preload?: boolean }) {
  return <figure className={`encounter-image ${className}`}>
    <Image src={`/images/${variant}-conversation.webp`} alt={label} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 90vw, 55vw" preload={preload} />
    <figcaption>KI-generiertes Symbolbild</figcaption>
  </figure>;
}
