import { Shield, CreditCard, Truck, Headphones, RefreshCw, Star } from "lucide-react";

const BENEFITS = [
  {
    Icon: Truck,
    title: "Envío express",
    description: "Entrega en 24 a 48hs hábiles a todo el país. Gratis en compras desde $300.000.",
    color: "text-[#22d3ee]",
    bg: "bg-[#06b6d4]/10",
    border: "border-[#06b6d4]/15",
  },
  {
    Icon: CreditCard,
    title: "Hasta 24 cuotas sin interés",
    description: "Con tarjetas de los principales bancos del país. Sin costo adicional.",
    color: "text-[#60a5fa]",
    bg: "bg-[#2563eb]/10",
    border: "border-[#2563eb]/15",
  },
  {
    Icon: Shield,
    title: "Garantía oficial",
    description: "12 meses de garantía oficial del fabricante en todos los equipos nuevos.",
    color: "text-[#34d399]",
    bg: "bg-[#059669]/10",
    border: "border-[#059669]/15",
  },
  {
    Icon: RefreshCw,
    title: "30 días de devolución",
    description: "Si no estás conforme, devolvés sin costo y sin preguntas. Reintegro en 5 días.",
    color: "text-[#a78bfa]",
    bg: "bg-[#7c3aed]/10",
    border: "border-[#7c3aed]/15",
  },
  {
    Icon: Headphones,
    title: "Soporte dedicado",
    description: "Atención por WhatsApp, mail y teléfono de lunes a sábado de 9 a 20hs.",
    color: "text-[#fbbf24]",
    bg: "bg-[#d97706]/10",
    border: "border-[#d97706]/15",
  },
  {
    Icon: Star,
    title: "Equipos 100% originales",
    description: "Todos nuestros equipos son originales, libres de fábrica y comprados a distribuidores oficiales.",
    color: "text-[#f87171]",
    bg: "bg-[#dc2626]/10",
    border: "border-[#dc2626]/15",
  },
];

export function TrustSection() {
  return (
    <section className="py-20 border-y border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-[#52525b] uppercase tracking-widest mb-3">¿Por qué elegirnos?</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#f8f8f8] mb-4">
            Comprás con total tranquilidad
          </h2>
          <p className="text-[#71717a] max-w-md mx-auto">
            Todo lo que necesitás para comprar con confianza está acá.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className={`flex gap-4 p-6 rounded-3xl ${benefit.bg} border ${benefit.border} transition-all duration-200 hover:border-opacity-40`}
            >
              <div className={`flex-shrink-0 w-11 h-11 rounded-2xl bg-white/6 flex items-center justify-center ${benefit.color}`}>
                <benefit.Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#f8f8f8] mb-1">{benefit.title}</h3>
                <p className="text-sm text-[#71717a] leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
