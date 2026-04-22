import { Rating } from "@/components/ui/Rating";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-[#52525b] uppercase tracking-widest mb-3">Opiniones reales</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#f8f8f8] mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-[#71717a]">
            Más de <span className="text-[#f8f8f8] font-semibold">12.000 clientes</span> ya compraron con nosotros.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5 mb-12">
          {[
            { value: "4.9", label: "Puntuación promedio", unit: "/5" },
            { value: "12K+", label: "Clientes satisfechos", unit: "" },
            { value: "98%", label: "Recomendarían APEX", unit: "" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center py-6 px-4 rounded-3xl bg-white/3 border border-white/6"
            >
              <p className="text-3xl sm:text-4xl font-black gradient-text-blue">
                {stat.value}
                <span className="text-xl font-bold">{stat.unit}</span>
              </p>
              <p className="text-sm text-[#71717a] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col gap-5 p-6 rounded-3xl glass border border-white/8 hover:border-white/14 transition-all duration-300"
            >
              {/* Stars */}
              <Rating value={t.rating} size="sm" />

              {/* Quote */}
              <p className="text-sm text-[#d4d4d4] leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/6">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563eb]/40 to-[#7c3aed]/40 flex items-center justify-center text-xs font-bold text-[#f8f8f8]">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#f8f8f8]">{t.name}</p>
                  <p className="text-xs text-[#71717a]">{t.role} · Compró: {t.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
