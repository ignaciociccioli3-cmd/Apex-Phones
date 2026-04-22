"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingBag, Search, Menu, X, Zap } from "lucide-react";
import { useCart } from "./CartProvider";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Tienda", href: "/tienda" },
  { label: "Ofertas", href: "/tienda?filter=oferta" },
  { label: "Reacondicionados", href: "/tienda?filter=reacondicionado" },
];

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, toggleDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      {/* Promo strip */}
      <div className="bg-[#2563eb] text-white text-xs font-medium py-2 text-center tracking-wide">
        🚀 Envío gratis en compras desde $300.000 · Hasta 24 cuotas sin interés · Retiro en el día
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled ? "glass-nav shadow-[0_1px_0_rgba(255,255,255,0.05)]" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#7c3aed] flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:shadow-[0_0_28px_rgba(37,99,235,0.6)] transition-all duration-300">
              <Zap className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[#f8f8f8]">
              APEX
              <span className="gradient-text-blue ml-1">Phones</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "text-[#f8f8f8] bg-white/8"
                    : "text-[#a1a1aa] hover:text-[#f8f8f8] hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/tienda"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl text-[#a1a1aa] hover:text-[#f8f8f8] hover:bg-white/6 transition-all duration-200"
              aria-label="Buscar"
            >
              <Search className="w-4.5 h-4.5" />
            </Link>

            <button
              onClick={toggleDrawer}
              className="relative flex items-center justify-center w-9 h-9 rounded-xl text-[#a1a1aa] hover:text-[#f8f8f8] hover:bg-white/6 transition-all duration-200"
              aria-label="Carrito"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#2563eb] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            <Link
              href="/checkout"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl btn-primary text-sm font-semibold"
            >
              Comprar ahora
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-[#a1a1aa] hover:text-[#f8f8f8] hover:bg-white/6 transition-all"
              aria-label="Menú"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden glass-nav border-t border-white/6 px-4 py-4 space-y-1 animate-fade-up">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  pathname === link.href
                    ? "text-[#f8f8f8] bg-white/8"
                    : "text-[#a1a1aa] hover:text-[#f8f8f8] hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/checkout"
                className="block w-full text-center px-4 py-3 rounded-xl btn-primary text-sm font-semibold"
              >
                Comprar ahora
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
