"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import type { FaqItem } from "@/lib/content";

export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return <div className="grid gap-3">
    {items.map((item, index) => <div key={`${item.question}-${index}`} className="overflow-hidden rounded-[10px] border border-brand-line bg-white">
      <button type="button" className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-brand-navy" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}>
        <span>{item.question}</span><CaretDown size={20} className={`shrink-0 text-brand-green transition ${open === index ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open === index ? <div className="border-t border-brand-line px-5 pb-5 pt-4 leading-relaxed text-brand-ink/75">{item.answer}</div> : null}
    </div>)}
  </div>;
}
