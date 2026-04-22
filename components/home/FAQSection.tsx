"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 border-t border-white/6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-[#52525b] uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#f8f8f8] mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-[#71717a]">
            Todo lo que necesitás saber antes de comprar.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                "rounded-2xl border transition-all duration-200",
                open === i
                  ? "bg-white/5 border-white/12"
                  : "bg-white/3 border-white/6 hover:bg-white/4 hover:border-white/10"
              )}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-[#f8f8f8] text-sm sm:text-base">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-[#71717a] flex-shrink-0 transition-transform duration-200",
                    open === i && "rotate-180 text-[#60a5fa]"
                  )}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-[#a1a1aa] leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
