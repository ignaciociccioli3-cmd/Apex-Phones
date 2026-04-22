"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronRight, CreditCard, Truck, Shield, Lock } from "lucide-react";
import { useCart } from "@/components/layout/CartProvider";
import { formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";

const STEPS = ["Contacto", "Envío", "Pago"];

interface FormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  province: string;
  zipCode: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  installments: string;
}

export default function CheckoutPage() {
  const { state, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [form, setForm] = useState<FormData>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    installments: "12",
  });

  const shipping = totalPrice >= 300000 ? 0 : 9900;
  const total = totalPrice + shipping;
  const installmentPrice = total / +form.installments;

  const set = (k: keyof FormData, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep((s) => s + 1);
    } else {
      setCompleted(true);
      clearCart();
    }
  };

  if (completed) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-[#059669]/20 border border-[#059669]/30 flex items-center justify-center">
          <Check className="w-10 h-10 text-[#34d399]" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#f8f8f8] mb-3">¡Pedido confirmado!</h1>
          <p className="text-[#a1a1aa] max-w-sm mx-auto">
            Recibiste un correo de confirmación. Tu pedido llega en{" "}
            <span className="text-[#f8f8f8] font-semibold">24 a 48hs hábiles</span>.
          </p>
        </div>
        <div className="px-6 py-4 rounded-2xl glass border border-white/8 text-sm text-[#71717a]">
          Número de orden: <span className="text-[#f8f8f8] font-mono font-bold">APEX-{Math.floor(Math.random() * 900000 + 100000)}</span>
        </div>
        <Link href="/tienda" className="px-8 py-3.5 rounded-xl btn-primary font-semibold">
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-black text-[#f8f8f8]">Checkout</h1>
          <div className="flex items-center gap-1 text-xs text-[#52525b]">
            <Lock className="w-3 h-3" />
            Pago seguro SSL
          </div>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-0 mb-12">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all",
                    i < step
                      ? "bg-[#059669] border-[#059669] text-white"
                      : i === step
                      ? "bg-[#2563eb] border-[#2563eb] text-white shadow-[0_0_16px_rgba(37,99,235,0.4)]"
                      : "bg-transparent border-white/15 text-[#71717a]"
                  )}
                >
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={cn("text-xs font-semibold", i === step ? "text-[#f8f8f8]" : "text-[#71717a]")}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("flex-1 h-px mx-3 mb-5 transition-all", i < step ? "bg-[#059669]/40" : "bg-white/8")} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-[#f8f8f8]">Información de contacto</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Nombre</label>
                    <input
                      required
                      type="text"
                      placeholder="Martín"
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      className="input-premium w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Apellido</label>
                    <input
                      required
                      type="text"
                      placeholder="García"
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      className="input-premium w-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="martin@email.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="input-premium w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Teléfono</label>
                  <input
                    required
                    type="tel"
                    placeholder="+54 9 11 0000-0000"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="input-premium w-full"
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-[#f8f8f8]">Dirección de envío</h2>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Dirección</label>
                  <input
                    required
                    type="text"
                    placeholder="Av. Corrientes 1234, 3° A"
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    className="input-premium w-full"
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2 sm:col-span-1">
                    <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">CP</label>
                    <input
                      required
                      type="text"
                      placeholder="1043"
                      value={form.zipCode}
                      onChange={(e) => set("zipCode", e.target.value)}
                      className="input-premium w-full"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-1">
                    <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Ciudad</label>
                    <input
                      required
                      type="text"
                      placeholder="CABA"
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      className="input-premium w-full"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-1">
                    <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Provincia</label>
                    <select
                      required
                      value={form.province}
                      onChange={(e) => set("province", e.target.value)}
                      className="input-premium w-full appearance-none"
                    >
                      <option value="">Seleccionar</option>
                      {["Buenos Aires", "CABA", "Córdoba", "Santa Fe", "Mendoza", "Tucumán", "Salta", "Rosario"].map((p) => (
                        <option key={p} value={p} className="bg-[#1e1e1e]">{p}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Shipping options */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider block">Método de envío</label>
                  {[
                    { label: "Express 24hs", price: shipping === 0 ? "Gratis" : formatPrice(shipping), desc: "Mañana antes de las 20hs" },
                    { label: "Estándar 3-5 días", price: "Gratis", desc: "Gratis en todos los pedidos" },
                  ].map((opt, i) => (
                    <label key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/3 border border-white/8 cursor-pointer hover:border-white/15 has-[:checked]:border-[#2563eb] has-[:checked]:bg-[#2563eb]/5 transition-all">
                      <input type="radio" name="shipping" defaultChecked={i === 0} className="accent-[#2563eb]" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#f8f8f8]">{opt.label}</p>
                        <p className="text-xs text-[#71717a]">{opt.desc}</p>
                      </div>
                      <span className={cn("text-sm font-bold", opt.price === "Gratis" ? "text-[#34d399]" : "text-[#f8f8f8]")}>
                        {opt.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-[#f8f8f8]">Información de pago</h2>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Número de tarjeta</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525b]" />
                    <input
                      required
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      value={form.cardNumber}
                      onChange={(e) => set("cardNumber", e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim())}
                      className="input-premium w-full pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Nombre en la tarjeta</label>
                  <input
                    required
                    type="text"
                    placeholder="MARTIN GARCIA"
                    value={form.cardName}
                    onChange={(e) => set("cardName", e.target.value.toUpperCase())}
                    className="input-premium w-full"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Vencimiento</label>
                    <input
                      required
                      type="text"
                      placeholder="MM/AA"
                      maxLength={5}
                      value={form.cardExpiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, "");
                        if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2, 4);
                        set("cardExpiry", v);
                      }}
                      className="input-premium w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">CVV</label>
                    <input
                      required
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      value={form.cardCvv}
                      onChange={(e) => set("cardCvv", e.target.value.replace(/\D/g, ""))}
                      className="input-premium w-full"
                    />
                  </div>
                </div>

                {/* Installments */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Cuotas</label>
                  <select
                    value={form.installments}
                    onChange={(e) => set("installments", e.target.value)}
                    className="input-premium w-full appearance-none"
                  >
                    {[1, 3, 6, 9, 12, 18, 24].map((n) => (
                      <option key={n} value={n} className="bg-[#1e1e1e]">
                        {n === 1
                          ? "1 pago"
                          : `${n} cuotas sin interés de ${formatPrice(total / n)}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#71717a] px-4 py-3 rounded-xl bg-white/3 border border-white/6">
                  <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                  Tu información de pago está encriptada con SSL de 256 bits.
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 pt-2">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="px-6 py-3.5 rounded-xl btn-secondary font-semibold text-sm"
                >
                  Atrás
                </button>
              )}
              <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl btn-primary font-bold text-base">
                {step === 2 ? (
                  <>
                    <Lock className="w-4 h-4" />
                    Confirmar compra
                  </>
                ) : (
                  <>
                    Continuar <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl glass border border-white/8 space-y-5 sticky top-24">
              <h2 className="font-black text-[#f8f8f8]">Tu pedido</h2>

              {/* Items */}
              <div className="space-y-3">
                {state.items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedStorage}`} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#1a1a1a] flex-shrink-0">
                      <img src={item.product.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#f8f8f8] truncate">{item.product.name}</p>
                      <p className="text-[11px] text-[#71717a]">{item.selectedStorage} · ×{item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-[#f8f8f8] flex-shrink-0">{formatPrice(item.unitPrice * item.quantity)}</p>
                  </div>
                ))}

                {state.items.length === 0 && (
                  <p className="text-sm text-[#71717a] text-center py-2">Carrito vacío</p>
                )}
              </div>

              <hr className="section-divider" />

              <div className="space-y-2 text-sm">
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
                <div className="flex justify-between font-black text-[#f8f8f8] text-base pt-2 border-t border-white/6">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Trust */}
              <div className="space-y-2">
                {[
                  { Icon: Shield, text: "Compra protegida" },
                  { Icon: Truck, text: "Envío express disponible" },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-[#71717a]">
                    <Icon className="w-3.5 h-3.5 text-[#52525b]" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
