import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";

export function TradeInBanner() {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-[#111] border border-white/8 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Glow */}
          <div className="absolute left-0 top-0 w-64 h-full bg-gradient-to-r from-[#7c3aed]/8 to-transparent pointer-events-none" />

          <div className="relative z-10 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#7c3aed]/15 border border-[#7c3aed]/20 flex items-center justify-center text-[#a78bfa] flex-shrink-0">
              <RefreshCw className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#f8f8f8]">Trade-In — Entregá tu usado</h3>
              <p className="text-sm text-[#71717a] mt-1">
                Tasamos tu celular online en 30 minutos y te damos un descuento real en tu próxima compra.
              </p>
            </div>
          </div>

          <Link
            href="#"
            className="relative z-10 flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-[#7c3aed]/15 border border-[#7c3aed]/25 text-[#a78bfa] font-semibold text-sm hover:bg-[#7c3aed]/25 hover:border-[#7c3aed]/40 transition-all duration-200"
          >
            Tasar mi celular <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
