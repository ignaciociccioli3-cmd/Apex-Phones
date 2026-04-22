import type { ProductSpec } from "@/lib/types";

interface ProductSpecsProps {
  specs: ProductSpec[];
  highlights: string[];
}

export function ProductSpecs({ specs, highlights }: ProductSpecsProps) {
  return (
    <div className="space-y-10">
      {/* Highlights */}
      <div>
        <h2 className="text-xl font-black text-[#f8f8f8] mb-6">Lo más destacado</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {highlights.map((h) => (
            <div
              key={h}
              className="flex items-start gap-3 p-4 rounded-2xl bg-white/3 border border-white/6"
            >
              <div className="w-5 h-5 rounded-full bg-[#2563eb]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-[#2563eb]" />
              </div>
              <span className="text-sm text-[#d4d4d4] leading-snug">{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Specs table */}
      <div>
        <h2 className="text-xl font-black text-[#f8f8f8] mb-6">Especificaciones técnicas</h2>
        <div className="rounded-2xl overflow-hidden border border-white/8">
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`flex gap-4 px-5 py-4 ${i % 2 === 0 ? "bg-white/2" : "bg-white/4"}`}
            >
              <dt className="text-sm font-semibold text-[#71717a] w-32 flex-shrink-0">{spec.label}</dt>
              <dd className="text-sm text-[#d4d4d4]">{spec.value}</dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
