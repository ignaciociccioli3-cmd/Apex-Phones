"use client";

import Link from "next/link";
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export function CartDrawer() {
  const { state, removeItem, updateQty, closeDrawer, totalPrice, totalItems } = useCart();

  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [state.isOpen]);

  const installmentPrice = totalPrice / 12;

  return (
    <>
      {/* Backdrop */}
      {state.isOpen && (
        <div
          className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm"
          onClick={closeDrawer}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-70 w-full max-w-md flex flex-col transition-transform duration-300 ease-out",
          "bg-[#0f0f0f] border-l border-white/8",
          state.isOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#2563eb]" />
            <h2 className="text-lg font-bold text-[#f8f8f8]">Tu carrito</h2>
            {totalItems > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#2563eb]/20 text-[#60a5fa] text-xs font-semibold">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[#71717a] hover:text-[#f8f8f8] hover:bg-white/6 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {state.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 py-16">
              <div className="w-16 h-16 rounded-2xl bg-white/4 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-[#52525b]" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-[#a1a1aa]">Tu carrito está vacío</p>
                <p className="text-sm text-[#52525b] mt-1">Explorá nuestro catálogo premium</p>
              </div>
              <Link
                href="/tienda"
                onClick={closeDrawer}
                className="mt-2 px-6 py-2.5 rounded-xl btn-primary text-sm font-semibold flex items-center gap-2"
              >
                Ver celulares <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            state.items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedStorage}-${item.selectedColor}`}
                className="flex gap-4 p-4 rounded-2xl bg-white/4 border border-white/6 group"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-xl bg-[#1e1e1e] flex-shrink-0 overflow-hidden">
                  <img
                    src={item.product.thumbnailUrl}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-[#f8f8f8] truncate">{item.product.name}</p>
                  <p className="text-xs text-[#71717a] mt-0.5">
                    {item.selectedStorage} · {item.selectedColor}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty */}
                    <div className="flex items-center gap-2 bg-white/6 rounded-xl px-2 py-1">
                      <button
                        onClick={() => updateQty(item.product.id, item.selectedStorage, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#a1a1aa] hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold text-[#f8f8f8] w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.product.id, item.selectedStorage, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#a1a1aa] hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <p className="font-bold text-[#f8f8f8] text-sm">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.product.id, item.selectedStorage)}
                  className="opacity-0 group-hover:opacity-100 self-start mt-1 w-6 h-6 flex items-center justify-center text-[#71717a] hover:text-red-400 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer summary */}
        {state.items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/8 space-y-4">
            {/* Installments */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#2563eb]/10 border border-[#2563eb]/20">
              <span className="text-xs text-[#60a5fa]">
                12 cuotas sin interés de {formatPrice(installmentPrice)}
              </span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-[#a1a1aa] text-sm">Total</span>
              <span className="text-xl font-bold text-[#f8f8f8]">{formatPrice(totalPrice)}</span>
            </div>

            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl btn-primary font-semibold text-base"
            >
              Ir al checkout <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/tienda"
              onClick={closeDrawer}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl btn-secondary font-medium text-sm"
            >
              Seguir comprando
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
