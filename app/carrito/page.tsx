"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/components/layout/CartProvider";
import { formatPrice } from "@/lib/data";
import { Rating } from "@/components/ui/Rating";

export default function CarritoPage() {
  const { state, removeItem, updateQty, totalPrice, totalItems } = useCart();

  const installments = 12;
  const installmentPrice = totalPrice / installments;
  const shipping = totalPrice >= 300000 ? 0 : 9900;

  if (state.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-20 h-20 rounded-3xl bg-white/4 flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 text-[#52525b]" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-black text-[#f8f8f8] mb-2">Tu carrito está vacío</h1>
          <p className="text-[#71717a]">Explorá nuestro catálogo y encontrá el celular perfecto.</p>
        </div>
        <Link href="/tienda" className="flex items-center gap-2 px-6 py-3.5 rounded-xl btn-primary font-semibold">
          Explorar tienda <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-black text-[#f8f8f8] mb-8">
          Tu carrito{" "}
          <span className="text-[#71717a] font-normal text-xl">({totalItems} productos)</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedStorage}`}
                className="flex gap-5 p-5 rounded-3xl glass border border-white/8"
              >
                {/* Image */}
                <Link href={`/producto/${item.product.slug}`} className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden bg-[#1a1a1a]">
                  <img
                    src={item.product.thumbnailUrl}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-[#71717a]">{item.product.brand}</p>
                      <Link href={`/producto/${item.product.slug}`} className="font-bold text-[#f8f8f8] hover:text-white transition-colors">
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-[#71717a] mt-0.5">
                        {item.selectedStorage} · {item.selectedColor}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.selectedStorage)}
                      className="text-[#71717a] hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <Rating value={item.product.rating} />

                  <div className="flex items-center justify-between">
                    {/* Qty */}
                    <div className="flex items-center gap-2 bg-white/6 rounded-xl px-2 py-1.5">
                      <button
                        onClick={() => updateQty(item.product.id, item.selectedStorage, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#a1a1aa] hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-semibold text-[#f8f8f8] w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.product.id, item.selectedStorage, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#a1a1aa] hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-black text-[#f8f8f8]">{formatPrice(item.unitPrice * item.quantity)}</p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-[#71717a]">{formatPrice(item.unitPrice)} c/u</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl glass border border-white/8 space-y-5 sticky top-24">
              <h2 className="font-black text-[#f8f8f8] text-lg">Resumen</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#a1a1aa]">
                  <span>Subtotal</span>
                  <span className="text-[#f8f8f8]">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-[#a1a1aa]">
                  <span>Envío</span>
                  <span className={shipping === 0 ? "text-[#34d399] font-semibold" : "text-[#f8f8f8]"}>
                    {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                  </span>
                </div>
                <hr className="section-divider" />
                <div className="flex justify-between font-black text-[#f8f8f8] text-base">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice + shipping)}</span>
                </div>
              </div>

              {/* Installments */}
              <div className="px-4 py-3 rounded-2xl bg-[#2563eb]/10 border border-[#2563eb]/20 text-sm">
                <p className="text-[#60a5fa] font-semibold">
                  {installments} cuotas de {formatPrice(installmentPrice)}
                </p>
                <p className="text-xs text-[#71717a] mt-0.5">Sin interés con todas las tarjetas</p>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl btn-primary font-bold text-base"
              >
                Ir al checkout <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/tienda"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl btn-secondary font-medium text-sm"
              >
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
