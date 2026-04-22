import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-[#f8f8f8]">También te puede interesar</h2>
        <Link
          href="/tienda"
          className="flex items-center gap-1 text-sm text-[#60a5fa] hover:text-[#93c5fd] transition-colors font-medium"
        >
          Ver más <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <Link key={product.id} href={`/producto/${product.slug}`} className="group">
            <div className="rounded-2xl overflow-hidden card-surface transition-all duration-300 group-hover:translate-y-[-2px]">
              <div className="aspect-square bg-[#1a1a1a] overflow-hidden">
                <img
                  src={product.thumbnailUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-2">
                {product.badges[0] && <Badge type={product.badges[0]} />}
                <p className="text-xs text-[#71717a]">{product.brand}</p>
                <p className="font-bold text-[#f8f8f8] text-sm group-hover:text-white transition-colors">
                  {product.name}
                </p>
                <Rating value={product.rating} count={product.reviewCount} />
                <p className="font-bold text-[#f8f8f8]">{formatPrice(product.price)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
