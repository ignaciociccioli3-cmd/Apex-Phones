"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7c3aed]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#06b6d4]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Copy column */}
          <div className="order-2 lg:order-1 space-y-8 animate-fade-up">
            {/* Label chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl glass border border-[#2563eb]/25 text-xs font-semibold text-[#60a5fa]">
              <Sparkles className="w-3.5 h-3.5" />
              Nuevos modelos 2025 disponibles
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
                <span className="gradient-text-white block">El celular</span>
                <span className="gradient-text-blue block">perfecto</span>
                <span className="gradient-text-white block">te espera.</span>
              </h1>
            </div>

            {/* Subhead */}
            <p className="text-lg text-[#a1a1aa] leading-relaxed max-w-lg">
              Explorá los smartphones más avanzados del mercado. Envío en 24hs, hasta{" "}
              <span className="text-[#f8f8f8] font-semibold">24 cuotas sin interés</span> y garantía
              oficial.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tienda"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl btn-primary text-base font-semibold"
              >
                Explorar tienda
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tienda?filter=oferta"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl btn-secondary text-base font-semibold"
              >
                Ver ofertas del mes
              </Link>
            </div>

            {/* Trust mini-row */}
            <div className="flex flex-wrap gap-5 pt-2">
              {[
                { icon: "🚚", text: "Envío en 24hs" },
                { icon: "💳", text: "24 cuotas sin interés" },
                { icon: "🔒", text: "Garantía oficial" },
                { icon: "↩️", text: "30 días devolución" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-1.5 text-sm text-[#71717a]">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product visual column */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative animate-fade-in">
            {/* Glow behind phone */}
            <div className="absolute inset-0 hero-glow-product rounded-full scale-75 blur-2xl pointer-events-none" />

            {/* Main phone mockup */}
            <div className="relative z-10 animate-float">
              <div className="w-[280px] sm:w-[320px] lg:w-[360px] aspect-[9/19] rounded-[3rem] overflow-hidden bg-[#111] border-2 border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.8),0_0_60px_rgba(37,99,235,0.2)]">
                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=90"
                  alt="iPhone 16 Pro Max"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating cards */}
              <div className="absolute -left-16 top-1/4 glass rounded-2xl px-3.5 py-3 border border-white/10 shadow-float animate-slide-right space-y-1 min-w-[140px]">
                <p className="text-[11px] text-[#71717a]">iPhone 16 Pro Max</p>
                <p className="text-sm font-bold text-[#f8f8f8]">$1.899.000</p>
                <p className="text-[10px] text-[#60a5fa]">24 cuotas de $79.125</p>
              </div>

              <div className="absolute -right-12 bottom-1/3 glass rounded-2xl px-3.5 py-3 border border-white/10 shadow-float">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#2563eb]/20 flex items-center justify-center">
                    <span className="text-sm">⭐</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#f8f8f8]">4.9 / 5</p>
                    <p className="text-[10px] text-[#71717a]">2.847 reseñas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#52525b] animate-bounce">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
