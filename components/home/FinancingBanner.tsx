import Link from "next/link";
import { ArrowRight, CreditCard } from "lucide-react";

export function FinancingBanner() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#7c3aed] p-10 sm:p-14">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white/70 text-sm font-semibold">
                <CreditCard className="w-4 h-4" />
                Financiación
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Hasta 24 cuotas<br />sin interés.
              </h2>
              <p className="text-white/75 max-w-xs">
                Con todas las tarjetas de crédito de los principales bancos del país. Sin costo adicional ni letra chica.
              </p>
            </div>
            <div className="flex-shrink-0 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {["Visa", "Mastercard", "Naranja X", "MODO", "Mercado Pago", "Uala"].map((bank) => (
                  <div key={bank} className="px-3 py-2 rounded-xl bg-white/15 text-white text-xs font-semibold text-center backdrop-blur-sm">
                    {bank}
                  </div>
                ))}
              </div>
              <Link
                href="/tienda"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white text-[#1d4ed8] font-bold text-sm hover:bg-white/90 transition-colors"
              >
                Comprar en cuotas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
