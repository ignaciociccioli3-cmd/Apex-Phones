import { reviews } from "@/lib/data";
import { Rating } from "@/components/ui/Rating";
import { ThumbsUp, BadgeCheck } from "lucide-react";

interface ProductReviewsProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

export function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  const productReviews = reviews.filter((r) => r.productId === productId).slice(0, 3);

  const starDist = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: Math.floor(reviewCount * (s === 5 ? 0.65 : s === 4 ? 0.22 : s === 3 ? 0.08 : s === 2 ? 0.03 : 0.02)),
    pct: s === 5 ? 65 : s === 4 ? 22 : s === 3 ? 8 : s === 2 ? 3 : 2,
  }));

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-black text-[#f8f8f8]">Reseñas</h2>

      {/* Summary */}
      <div className="grid sm:grid-cols-2 gap-8 p-6 rounded-3xl bg-white/3 border border-white/6">
        {/* Score */}
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-6xl font-black gradient-text-blue">{rating.toFixed(1)}</p>
          <Rating value={rating} size="md" />
          <p className="text-sm text-[#71717a]">{reviewCount.toLocaleString("es-AR")} reseñas</p>
        </div>

        {/* Bar chart */}
        <div className="space-y-2.5">
          {starDist.map(({ star, pct }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-xs text-[#71717a] w-3">{star}</span>
              <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-[#71717a] w-6 text-right">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      {productReviews.length > 0 ? (
        <div className="space-y-4">
          {productReviews.map((r) => (
            <div key={r.id} className="p-6 rounded-2xl bg-white/3 border border-white/6 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563eb]/30 to-[#7c3aed]/30 flex items-center justify-center text-xs font-bold text-[#f8f8f8]">
                    {r.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-[#f8f8f8]">{r.author}</p>
                      {r.verified && (
                        <BadgeCheck className="w-3.5 h-3.5 text-[#60a5fa]" />
                      )}
                    </div>
                    <p className="text-xs text-[#71717a]">{r.date}</p>
                  </div>
                </div>
                <Rating value={r.rating} size="sm" />
              </div>

              <h4 className="font-semibold text-[#f8f8f8] text-sm">{r.title}</h4>
              <p className="text-sm text-[#a1a1aa] leading-relaxed">{r.body}</p>

              <div className="flex items-center gap-2 text-xs text-[#71717a]">
                <button className="flex items-center gap-1.5 hover:text-[#f8f8f8] transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Útil ({r.helpful})
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-[#71717a]">
          <p>Sé el primero en dejar una reseña.</p>
        </div>
      )}
    </div>
  );
}
