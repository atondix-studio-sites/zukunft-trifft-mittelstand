export function ImagePlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return <div className={`image-placeholder ${className}`} role="img" aria-label={`Bildplatzhalter: ${label}`}><p className="image-placeholder__label">Bildplatzhalter<br /><span className="font-body text-base font-normal leading-normal text-white/75">{label}</span></p></div>;
}
