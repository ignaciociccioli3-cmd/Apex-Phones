import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-semibold text-[#52525b] uppercase tracking-widest mb-3">Selección premium</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#f8f8f8]">
              Productos destacados
            </h2>
          </div>
          <Link
            href="/tienda"
            className="flex-shrink-0 flex items-center gap-1.5 text-sm text-[#60a5fa] hover:text-[#93c5fd] transition-colors font-medium"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
