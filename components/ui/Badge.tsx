import { cn } from "@/lib/utils";
import type { ProductBadge } from "@/lib/types";

const BADGE_CONFIG: Record<
  ProductBadge,
  { label: string; className: string }
> = {
  nuevo: {
    label: "Nuevo",
    className: "bg-[#2563eb]/20 text-[#60a5fa] border border-[#2563eb]/30",
  },
  oferta: {
    label: "Oferta",
    className: "bg-[#dc2626]/20 text-[#f87171] border border-[#dc2626]/30",
  },
  recomendado: {
    label: "⭐ Recomendado",
    className: "bg-[#d97706]/20 text-[#fbbf24] border border-[#d97706]/30",
  },
  "mejor-camara": {
    label: "📸 Mejor cámara",
    className: "bg-[#7c3aed]/20 text-[#a78bfa] border border-[#7c3aed]/30",
  },
  "mejor-bateria": {
    label: "🔋 Mayor batería",
    className: "bg-[#059669]/20 text-[#34d399] border border-[#059669]/30",
  },
  gaming: {
    label: "🎮 Gaming",
    className: "bg-[#06b6d4]/20 text-[#22d3ee] border border-[#06b6d4]/30",
  },
  reacondicionado: {
    label: "♻️ Reacondicionado",
    className: "bg-[#71717a]/20 text-[#a1a1aa] border border-[#71717a]/30",
  },
  agotado: {
    label: "Sin stock",
    className: "bg-[#3f3f3f]/60 text-[#71717a] border border-white/10",
  },
};

interface BadgeProps {
  type: ProductBadge;
  className?: string;
}

export function Badge({ type, className }: BadgeProps) {
  const config = BADGE_CONFIG[type];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-xl text-[11px] font-semibold whitespace-nowrap",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
