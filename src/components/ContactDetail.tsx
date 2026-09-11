export function ContactDetail({ value, kind }: { value: string; kind: "email" | "phone" }) {
  const valid = kind === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : /^\+?[\d\s()/.-]{6,}$/.test(value);
  const href = kind === "email" ? `mailto:${value}` : `tel:${value.replace(/[^+\d]/g, "")}`;
  return valid ? <a className="break-all underline underline-offset-4" href={href}>{value}</a> : <span>{value}</span>;
}
