"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  Share2,
  GitCompare,
  Check,
  ChevronDown,
  Truck,
  Shield,
  RefreshCw,
  CreditCard,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice, discountPercent } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { useCart } from "@/components/layout/CartProvider";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(
    product.colors.find((c) => c.available)?.name ?? product.colors[0].name
  );
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0].label);
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);

  const storageOption = product.storage.find((s) => s.label === selectedStorage)!;
  const finalPrice = product.price + storageOption.priceModifier;
  const installmentPrice = finalPrice / product.installments;
  const discount = product.originalPrice ? discountPercent(product.originalPrice, finalPrice) : null;

  const handleAddToCart = () => {
    addItem({
      product,
      quantity: 1,
      selectedColor,
      selectedStorage,
      unitPrice: finalPrice,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-7">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.badges.map((b) => (
          <Badge key={b} type={b} />
        ))}
        {product.has5G && (
          <span className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-[#06b6d4]/15 text-[#22d3ee] border border-[#06b6d4]/25">
            5G
          </span>
        )}
      </div>

      {/* Name + rating */}
      <div>
        <p className="text-sm font-semibold text-[#71717a] uppercase tracking-widest mb-2">
          {product.brand}
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-[#f8f8f8] leading-tight mb-4">
          {product.name}
        </h1>
        <div className="flex items-center gap-3">
          <Rating value={product.rating} count={product.reviewCount} size="md" />
          <span className="text-sm text-[#71717a]">· Entrega verificada</span>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-1">
        {product.originalPrice && (
          <div className="flex items-center gap-2">
            <p className="text-base text-[#71717a] line-through">{formatPrice(product.originalPrice)}</p>
            {discount && (
              <span className="px-2 py-0.5 rounded-lg bg-[#dc2626]/20 text-[#f87171] text-xs font-bold">
                -{discount}%
              </span>
            )}
          </div>
        )}
        <p className="text-4xl font-black text-[#f8f8f8]">{formatPrice(finalPrice)}</p>
        <p className="text-sm text-[#71717a]">
          {product.installments} cuotas sin interés de{" "}
          <span className="text-[#60a5fa] font-semibold">{formatPrice(installmentPrice)}</span>
        </p>
      </div>

      {/* Color selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-[#f8f8f8]">Color</p>
          <p className="text-sm text-[#71717a]">{selectedColor}</p>
        </div>
        <div className="flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              title={color.name}
              disabled={!color.available}
              onClick={() => setSelectedColor(color.name)}
              className={cn(
                "w-10 h-10 rounded-xl transition-all duration-200",
                "border-2 relative",
                !color.available && "opacity-30 cursor-not-allowed",
                selectedColor === color.name
                  ? "border-[#2563eb] shadow-[0_0_16px_rgba(37,99,235,0.4)] scale-110"
                  : "border-white/15 hover:border-white/30 hover:scale-105"
              )}
              style={{ backgroundColor: color.hex }}
            >
              {selectedColor === color.name && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white drop-shadow" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Storage selector */}
      <div>
        <p className="text-sm font-semibold text-[#f8f8f8] mb-3">Almacenamiento</p>
        <div className="flex flex-wrap gap-2">
          {product.storage.map((s) => (
            <button
              key={s.label}
              disabled={!s.available}
              onClick={() => setSelectedStorage(s.label)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200",
                !s.available && "opacity-30 cursor-not-allowed",
                selectedStorage === s.label
                  ? "bg-[#2563eb] border-[#2563eb] text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                  : "bg-white/5 border-white/12 text-[#a1a1aa] hover:bg-white/10 hover:border-white/25 hover:text-[#f8f8f8]"
              )}
            >
              {s.label}
              {s.priceModifier > 0 && (
                <span className="ml-1 text-[10px] font-normal opacity-70">
                  +{formatPrice(s.priceModifier)}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all duration-200",
            added
              ? "bg-[#059669]/20 border border-[#059669]/30 text-[#34d399]"
              : "btn-primary"
          )}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" />
              Agregado al carrito
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              Agregar al carrito
            </>
          )}
        </button>

        <Link
          href="/checkout"
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base text-[#f8f8f8] bg-white/8 border border-white/12 hover:bg-white/12 hover:border-white/20 transition-all duration-200"
        >
          Comprar ahora
        </Link>
      </div>

      {/* Secondary actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setWished((v) => !v)}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all border",
            wished
              ? "text-red-400 bg-red-400/10 border-red-400/20"
              : "text-[#71717a] bg-white/4 border-white/8 hover:text-[#f8f8f8] hover:bg-white/8"
          )}
        >
          <Heart className={cn("w-4 h-4", wished && "fill-current")} />
          {wished ? "Guardado" : "Guardar"}
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-[#71717a] bg-white/4 border border-white/8 hover:text-[#f8f8f8] hover:bg-white/8 transition-all">
          <GitCompare className="w-4 h-4" />
          Comparar
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-[#71717a] bg-white/4 border border-white/8 hover:text-[#f8f8f8] hover:bg-white/8 transition-all">
          <Share2 className="w-4 h-4" />
          Compartir
        </button>
      </div>

      {/* Mini trust badges */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {[
          { Icon: Truck, text: "Envío en 24hs gratis" },
          { Icon: Shield, text: "Garantía oficial 12 meses" },
          { Icon: RefreshCw, text: "30 días de devolución" },
          { Icon: CreditCard, text: "Hasta 24 cuotas sin interés" },
        ].map(({ Icon, text }) => (
          <div key={text} className="flex items-center gap-2 text-xs text-[#71717a]">
            <Icon className="w-4 h-4 text-[#52525b] flex-shrink-0" />
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
