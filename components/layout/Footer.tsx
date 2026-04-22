import Link from "next/link";
import { Zap, Camera, MessageCircle, Rss, Mail, Phone } from "lucide-react";

const FOOTER_LINKS = {
  Tienda: [
    { label: "Todos los celulares", href: "/tienda" },
    { label: "Novedades", href: "/tienda?filter=nuevo" },
    { label: "Ofertas", href: "/tienda?filter=oferta" },
    { label: "Reacondicionados", href: "/tienda?filter=reacondicionado" },
    { label: "Comparar equipos", href: "/tienda" },
  ],
  Marcas: [
    { label: "Apple iPhone", href: "/tienda?brand=Apple" },
    { label: "Samsung Galaxy", href: "/tienda?brand=Samsung" },
    { label: "Google Pixel", href: "/tienda?brand=Google" },
    { label: "Xiaomi", href: "/tienda?brand=Xiaomi" },
    { label: "Motorola", href: "/tienda?brand=Motorola" },
  ],
  Ayuda: [
    { label: "Preguntas frecuentes", href: "/#faq" },
    { label: "Estado de mi pedido", href: "#" },
    { label: "Garantías y devoluciones", href: "#" },
    { label: "Trade-in", href: "#" },
    { label: "Financiación", href: "#" },
  ],
  "Sobre APEX": [
    { label: "Quiénes somos", href: "#" },
    { label: "Blog de tecnología", href: "#" },
    { label: "Trabaja con nosotros", href: "#" },
    { label: "Prensa", href: "#" },
    { label: "Términos y condiciones", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/6">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
        {/* Brand col */}
        <div className="col-span-2 space-y-5">
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#7c3aed] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              APEX<span className="gradient-text-blue ml-1">Phones</span>
            </span>
          </Link>

          <p className="text-sm text-[#71717a] leading-relaxed max-w-xs">
            La tienda de smartphones premium de Argentina. Equipos originales, garantía oficial y la mejor experiencia de compra.
          </p>

          <div className="space-y-2">
            <a href="mailto:hola@apexphones.com.ar" className="flex items-center gap-2 text-sm text-[#71717a] hover:text-[#f8f8f8] transition-colors">
              <Mail className="w-4 h-4" />
              hola@apexphones.com.ar
            </a>
            <a href="tel:+5491100000000" className="flex items-center gap-2 text-sm text-[#71717a] hover:text-[#f8f8f8] transition-colors">
              <Phone className="w-4 h-4" />
              +54 9 11 0000-0000
            </a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { icon: Camera, label: "Instagram" },
              { icon: MessageCircle, label: "Twitter / X" },
              { icon: Rss, label: "YouTube" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-[#71717a] hover:text-[#f8f8f8] hover:bg-white/10 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title} className="space-y-4">
            <h3 className="text-xs font-semibold text-[#52525b] uppercase tracking-widest">{title}</h3>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#71717a] hover:text-[#f8f8f8] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-xs text-[#52525b]">
            <span className="flex items-center gap-1.5">🔒 Pago seguro SSL</span>
            <span className="flex items-center gap-1.5">✓ Garantía oficial</span>
            <span className="flex items-center gap-1.5">↩️ 30 días de devolución</span>
            <span className="flex items-center gap-1.5">🚚 Envío express</span>
          </div>
          <p className="text-xs text-[#3f3f3f]">
            © {new Date().getFullYear()} APEX Phones. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
