import Link from "next/link";
import { Camera, Battery, Gamepad2, Tag, Briefcase, Video } from "lucide-react";

const CATEGORIES = [
  {
    id: "camara",
    label: "Mejor Cámara",
    description: "Fotos y video de nivel profesional",
    Icon: Camera,
    href: "/tienda?badge=mejor-camara",
    gradient: "from-[#7c3aed]/20 to-[#2563eb]/10",
    iconColor: "text-[#a78bfa]",
    border: "border-[#7c3aed]/20 hover:border-[#7c3aed]/40",
    glow: "hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]",
  },
  {
    id: "bateria",
    label: "Mayor Batería",
    description: "Todo el día sin preocuparte",
    Icon: Battery,
    href: "/tienda?badge=mejor-bateria",
    gradient: "from-[#059669]/20 to-[#065f46]/10",
    iconColor: "text-[#34d399]",
    border: "border-[#059669]/20 hover:border-[#059669]/40",
    glow: "hover:shadow-[0_0_40px_rgba(5,150,105,0.12)]",
  },
  {
    id: "gaming",
    label: "Gaming",
    description: "Performance máxima para jugar",
    Icon: Gamepad2,
    href: "/tienda?badge=gaming",
    gradient: "from-[#06b6d4]/20 to-[#0891b2]/10",
    iconColor: "text-[#22d3ee]",
    border: "border-[#06b6d4]/20 hover:border-[#06b6d4]/40",
    glow: "hover:shadow-[0_0_40px_rgba(6,182,212,0.12)]",
  },
  {
    id: "precio",
    label: "Mejor Precio",
    description: "Calidad premium accesible",
    Icon: Tag,
    href: "/tienda?filter=oferta",
    gradient: "from-[#dc2626]/20 to-[#991b1b]/10",
    iconColor: "text-[#f87171]",
    border: "border-[#dc2626]/20 hover:border-[#dc2626]/40",
    glow: "hover:shadow-[0_0_40px_rgba(220,38,38,0.12)]",
  },
  {
    id: "trabajo",
    label: "Para el Trabajo",
    description: "Productividad sin límites",
    Icon: Briefcase,
    href: "/tienda?badge=recomendado",
    gradient: "from-[#2563eb]/20 to-[#1d4ed8]/10",
    iconColor: "text-[#60a5fa]",
    border: "border-[#2563eb]/20 hover:border-[#2563eb]/40",
    glow: "hover:shadow-[0_0_40px_rgba(37,99,235,0.12)]",
  },
  {
    id: "contenido",
    label: "Creadores",
    description: "Para crear contenido increíble",
    Icon: Video,
    href: "/tienda?badge=mejor-camara",
    gradient: "from-[#d97706]/20 to-[#92400e]/10",
    iconColor: "text-[#fbbf24]",
    border: "border-[#d97706]/20 hover:border-[#d97706]/40",
    glow: "hover:shadow-[0_0_40px_rgba(217,119,6,0.12)]",
  },
];

export function CategorySelector() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-[#52525b] uppercase tracking-widest mb-3">Encontrá el tuyo</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#f8f8f8] mb-4">
            Elegí según lo que te importa
          </h2>
          <p className="text-[#71717a] max-w-md mx-auto">
            Cada persona busca algo distinto. ¿Qué es lo más importante para vos?
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`group flex flex-col items-center gap-4 p-6 rounded-3xl bg-gradient-to-b ${cat.gradient} border ${cat.border} ${cat.glow} transition-all duration-300 text-center`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-white/6 flex items-center justify-center ${cat.iconColor} group-hover:scale-110 transition-transform duration-200`}>
                <cat.Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-[#f8f8f8] text-sm leading-tight">{cat.label}</p>
                <p className="text-[11px] text-[#71717a] mt-1 leading-snug">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
