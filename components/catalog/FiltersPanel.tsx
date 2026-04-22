"use client";

import { useState, useCallback } from "react";
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterState {
  brands: string[];
  os: string[];
  badges: string[];
  has5G: boolean | null;
  isRefurbished: boolean | null;
  priceMax: number;
  priceMin: number;
}

const INITIAL_FILTERS: FilterState = {
  brands: [],
  os: [],
  badges: [],
  has5G: null,
  isRefurbished: null,
  priceMin: 0,
  priceMax: 3000000,
};

interface FiltersPanelProps {
  onFilterChange: (filters: FilterState) => void;
  productCount: number;
  initialFilters?: FilterState;
}

const BRAND_OPTIONS = ["Apple", "Samsung", "Google", "Xiaomi", "Motorola"];
const OS_OPTIONS = [
  { value: "iOS", label: "iOS" },
  { value: "Android", label: "Android" },
];
const BADGE_OPTIONS = [
  { value: "nuevo", label: "Nuevo" },
  { value: "oferta", label: "En oferta" },
  { value: "recomendado", label: "Recomendado" },
  { value: "mejor-camara", label: "Mejor cámara" },
  { value: "mejor-bateria", label: "Mayor batería" },
  { value: "gaming", label: "Gaming" },
  { value: "reacondicionado", label: "Reacondicionado" },
];

function FilterGroup({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/6 pb-5 mb-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-1 text-sm font-semibold text-[#f8f8f8] hover:text-white"
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-[#71717a]" /> : <ChevronDown className="w-4 h-4 text-[#71717a]" />}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function CheckOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group py-1">
      <div
        className={cn(
          "w-4 h-4 rounded-md border flex-shrink-0 flex items-center justify-center transition-all",
          checked
            ? "bg-[#2563eb] border-[#2563eb]"
            : "border-white/20 group-hover:border-white/40"
        )}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className={cn("text-sm transition-colors", checked ? "text-[#f8f8f8]" : "text-[#a1a1aa] group-hover:text-[#f8f8f8]")}>
        {label}
      </span>
    </label>
  );
}

export function FiltersPanel({ onFilterChange, productCount, initialFilters }: FiltersPanelProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters ?? INITIAL_FILTERS);
  const [mobileOpen, setMobileOpen] = useState(false);

  const update = useCallback(
    (patch: Partial<FilterState>) => {
      const next = { ...filters, ...patch };
      setFilters(next);
      onFilterChange(next);
    },
    [filters, onFilterChange]
  );

  const toggleArray = (key: "brands" | "os" | "badges", value: string) => {
    const arr = filters[key] as string[];
    update({
      [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    });
  };

  const activeCount =
    filters.brands.length +
    filters.os.length +
    filters.badges.length +
    (filters.has5G !== null ? 1 : 0) +
    (filters.isRefurbished !== null ? 1 : 0) +
    (filters.priceMax < 3000000 ? 1 : 0);

  const clearAll = () => {
    setFilters(INITIAL_FILTERS);
    onFilterChange(INITIAL_FILTERS);
  };

  const panel = (
    <div className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#a1a1aa]" />
          <span className="font-bold text-[#f8f8f8]">Filtros</span>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#2563eb]/20 text-[#60a5fa] text-xs font-semibold">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs text-[#71717a] hover:text-[#f8f8f8] transition-colors flex items-center gap-1">
            <X className="w-3 h-3" /> Limpiar
          </button>
        )}
      </div>

      {/* Marca */}
      <FilterGroup title="Marca">
        <div className="space-y-1">
          {BRAND_OPTIONS.map((b) => (
            <CheckOption
              key={b}
              label={b}
              checked={filters.brands.includes(b)}
              onChange={() => toggleArray("brands", b)}
            />
          ))}
        </div>
      </FilterGroup>

      {/* Sistema operativo */}
      <FilterGroup title="Sistema operativo">
        <div className="space-y-1">
          {OS_OPTIONS.map((o) => (
            <CheckOption
              key={o.value}
              label={o.label}
              checked={filters.os.includes(o.value)}
              onChange={() => toggleArray("os", o.value)}
            />
          ))}
        </div>
      </FilterGroup>

      {/* Categoría */}
      <FilterGroup title="Categoría">
        <div className="space-y-1">
          {BADGE_OPTIONS.map((b) => (
            <CheckOption
              key={b.value}
              label={b.label}
              checked={filters.badges.includes(b.value)}
              onChange={() => toggleArray("badges", b.value)}
            />
          ))}
        </div>
      </FilterGroup>

      {/* Precio */}
      <FilterGroup title="Precio máximo">
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={3000000}
            step={50000}
            value={filters.priceMax}
            onChange={(e) => update({ priceMax: +e.target.value })}
            className="w-full accent-[#2563eb]"
          />
          <div className="flex justify-between text-xs text-[#71717a]">
            <span>$0</span>
            <span className="text-[#f8f8f8] font-semibold">
              ${(filters.priceMax / 1000).toFixed(0)}K
            </span>
            <span>$3M</span>
          </div>
        </div>
      </FilterGroup>

      {/* 5G */}
      <FilterGroup title="Conectividad" defaultOpen={false}>
        <div className="space-y-1">
          <CheckOption
            label="Solo equipos 5G"
            checked={filters.has5G === true}
            onChange={() => update({ has5G: filters.has5G === true ? null : true })}
          />
        </div>
      </FilterGroup>

      {/* Resultado count */}
      <div className="mt-4 pt-4 border-t border-white/6">
        <p className="text-xs text-[#71717a] text-center">
          {productCount} {productCount === 1 ? "producto" : "productos"} encontrados
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop panel */}
      <div className="hidden lg:block w-64 flex-shrink-0 p-5 rounded-3xl bg-white/3 border border-white/6 self-start sticky top-24">
        {panel}
      </div>

      {/* Mobile filter button */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-[#f8f8f8] hover:bg-white/8 transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#2563eb] text-white text-xs font-bold">
              {activeCount}
            </span>
          )}
        </button>

        {/* Mobile drawer */}
        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 z-70 w-80 bg-[#0f0f0f] border-r border-white/8 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[#f8f8f8]">Filtros</h3>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-[#71717a] hover:text-white hover:bg-white/6 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {panel}
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full mt-4 py-3 rounded-xl btn-primary font-semibold text-sm"
              >
                Ver {productCount} resultados
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
