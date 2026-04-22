"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice, discountPercent } from "@/lib/data";
import { Badge } from "./Badge";
import { Rating } from "./Rating";
import { useCart } from "@/components/layout/CartProvider";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();
  const [wished, setWished] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addItem({
      product,
      quantity: 1,
      selectedColor: product.colors.find((c) => c.available)?.name ?? "",
      selectedStorage: product.storage[0].label,
      unitPrice: product.price,
    });
    setTimeout(() => setAdding(false), 1200);
  };

  const primaryBadge = product.badges[0];
  const discount = product.originalPrice
    ? discountPercent(product.originalPrice, product.price)
    : null;

  return (
    <Link href={`/producto/${product.slug}`} className={cn("group block", className)}>
      <article className="relative rounded-3xl overflow-hidden card-surface transition-all duration-300 group-hover:translate-y-[-3px] h-full flex flex-col">
        {/* Image area */}
        <div className="relative aspect-[4/3] bg-gradient-to-b from-[#1a1a1a] to-[#111111] overflow-hidden flex-shrink-0">
          <img
            src={product.thumbnailUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Image overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {primaryBadge && <Badge type={primaryBadge} />}
            {discount && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-[11px] font-bold bg-[#dc2626] text-white">
                -{discount}%
              </span>
            )}
          </div>

          {/* Actions overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setWished((v) => !v);
              }}
              className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200",
                "bg-black/50 backdrop-blur-sm border border-white/10",
                wished ? "text-red-400" : "text-[#a1a1aa] hover:text-white"
              )}
              aria-label="Favorito"
            >
              <Heart className={cn("w-3.5 h-3.5", wished && "fill-current")} />
            </button>
            <button
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[#a1a1aa] hover:text-white bg-black/50 backdrop-blur-sm border border-white/10 transition-all duration-200"
              aria-label="Vista rápida"
              onClick={(e) => e.preventDefault()}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 5G chip */}
          {product.has5G && (
            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] font-bold text-[#22d3ee]">
              5G
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="flex-1 flex flex-col p-5 gap-3">
          {/* Brand + model */}
          <div>
            <p className="text-xs font-medium text-[#71717a] uppercase tracking-wider">{product.brand}</p>
            <h3 className="font-bold text-[#f8f8f8] text-base leading-tight mt-0.5 group-hover:text-white transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Rating */}
          <Rating value={product.rating} count={product.reviewCount} />

          {/* Key specs chips */}
          <div className="flex flex-wrap gap-1.5">
            {[
              `${product.camera_mp} MP`,
              `${product.battery_mah / 1000}K mAh`,
              `${product.ram} GB RAM`,
            ].map((spec) => (
              <span
                key={spec}
                className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/8 text-[11px] text-[#a1a1aa]"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price */}
          <div className="space-y-0.5">
            {product.originalPrice && (
              <p className="text-xs text-[#71717a] line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="text-xl font-bold text-[#f8f8f8]">{formatPrice(product.price)}</p>
            <p className="text-xs text-[#71717a]">
              {product.installments} cuotas de {formatPrice(product.installmentPrice)}
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleAddToCart}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
              adding
                ? "bg-[#059669]/20 border border-[#059669]/30 text-[#34d399]"
                : "btn-primary"
            )}
          >
            <ShoppingBag className="w-4 h-4" />
            {adding ? "¡Agregado!" : "Agregar al carrito"}
          </button>
        </div>
      </article>
    </Link>
  );
}
