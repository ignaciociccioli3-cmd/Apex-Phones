import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BRANDS = [
  { name: "Apple", symbol: "🍎", models: "iPhone 15 · iPhone 16 · Pro Max", href: "/tienda?brand=Apple" },
  { name: "Samsung", symbol: "◈", models: "Galaxy S25 · Z Fold · A55", href: "/tienda?brand=Samsung" },
  { name: "Google", symbol: "◎", models: "Pixel 9 · Pro · Pro XL", href: "/tienda?brand=Google" },
  { name: "Xiaomi", symbol: "✦", models: "14 Ultra · 14T Pro", href: "/tienda?brand=Xiaomi" },
  { name: "Motorola", symbol: "⊕", models: "Edge 50 Pro · G85", href: "/tienda?brand=Motorola" },
];

export function BrandStrip() {
  return (
    <section className="py-16 border-y border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-[#52525b] uppercase tracking-widest mb-2">Marcas</p>
            <h2 className="text-2xl font-bold text-[#f8f8f8]">Las mejores marcas del mundo</h2>
          </div>
          <Link
            href="/tienda"
            className="hidden sm:flex items-center gap-1.5 text-sm text-[#60a5fa] hover:text-[#93c5fd] transition-colors font-medium"
          >
            Ver todo el catálogo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={brand.href}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/3 border border-white/6 hover:bg-white/6 hover:border-white/12 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-white/6 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200">
                {brand.symbol}
              </div>
              <div className="text-center">
                <p className="font-bold text-[#f8f8f8] text-sm">{brand.name}</p>
                <p className="text-[11px] text-[#71717a] mt-0.5">{brand.models}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
