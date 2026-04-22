"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Search, LayoutGrid, List, ArrowUpDown } from "lucide-react";
import { products } from "@/lib/data";
import { FiltersPanel, type FilterState } from "./FiltersPanel";
import { ProductCard } from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevancia" },
  { value: "price-asc", label: "Menor precio" },
  { value: "price-desc", label: "Mayor precio" },
  { value: "rating", label: "Mejor calificación" },
  { value: "newest", label: "Más nuevos" },
];

const BASE_FILTERS: FilterState = {
  brands: [],
  os: [],
  badges: [],
  has5G: null,
  isRefurbished: null,
  priceMin: 0,
  priceMax: 3000000,
};

function filtersFromParams(params: URLSearchParams): FilterState {
  const f = { ...BASE_FILTERS };
  const filter = params.get("filter");
  const badge = params.get("badge");
  const brand = params.get("brand");
  if (filter) f.badges = [filter];
  if (badge) f.badges = [badge];
  if (brand) f.brands = [brand];
  return f;
}

function applyFilters(items: Product[], filters: FilterState, query: string): Product[] {
  return items.filter((p) => {
    if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;
    if (filters.os.length > 0 && !filters.os.includes(p.os)) return false;
    if (filters.badges.length > 0 && !filters.badges.some((b) => p.badges.includes(b as any))) return false;
    if (filters.has5G === true && !p.has5G) return false;
    if (filters.isRefurbished === true && !p.isRefurbished) return false;
    if (p.price > filters.priceMax) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

function applySort(items: Product[], sort: string): Product[] {
  return [...items].sort((a, b) => {
    switch (sort) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "newest": return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default: return b.badges.length - a.badges.length;
    }
  });
}

export function CatalogView() {
  const searchParams = useSearchParams();
  const initialFilters = filtersFromParams(searchParams);

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState("relevance");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const handleFilterChange = useCallback((f: FilterState) => setFilters(f), []);

  const filtered = useMemo(() => applySort(applyFilters(products, filters, query), sort), [filters, sort, query]);

  return (
    <div className="min-h-screen pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-[#f8f8f8] mb-2">
            {initialFilters.badges.includes("oferta")
              ? "Ofertas del mes"
              : initialFilters.badges.includes("reacondicionado")
              ? "Equipos reacondicionados"
              : initialFilters.badges.includes("nuevo")
              ? "Novedades"
              : initialFilters.brands.length > 0
              ? initialFilters.brands[0]
              : "Catálogo completo"}
          </h1>
          <p className="text-[#71717a]">Los mejores smartphones del mercado, en un solo lugar.</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525b]" />
            <input
              type="text"
              placeholder="Buscar marca o modelo..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-premium w-full pl-10 pr-4 text-sm"
            />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#52525b] pointer-events-none" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-premium pl-9 pr-8 text-sm appearance-none cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-[#1e1e1e]">
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/8">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "p-2 rounded-lg transition-all",
                view === "grid" ? "bg-white/10 text-[#f8f8f8]" : "text-[#71717a] hover:text-[#f8f8f8]"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "p-2 rounded-lg transition-all",
                view === "list" ? "bg-white/10 text-[#f8f8f8]" : "text-[#71717a] hover:text-[#f8f8f8]"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile filters button + main layout */}
        <div className="flex gap-8">
          {/* Filters sidebar */}
          <FiltersPanel onFilterChange={handleFilterChange} productCount={filtered.length} initialFilters={initialFilters} />

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {/* Result count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-[#71717a]">
                <span className="text-[#f8f8f8] font-semibold">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "producto" : "productos"}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/4 flex items-center justify-center text-3xl">
                  🔍
                </div>
                <div className="text-center">
                  <p className="font-semibold text-[#a1a1aa]">Sin resultados</p>
                  <p className="text-sm text-[#52525b] mt-1">Probá con otros filtros o términos de búsqueda</p>
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  "grid gap-5",
                  view === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                )}
              >
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
