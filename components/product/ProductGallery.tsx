"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4 sticky top-24">
      {/* Main image */}
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border border-white/8 group">
        <img
          src={images[active]}
          alt={`${productName} vista ${active + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Zoom hint */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#a1a1aa] opacity-0 group-hover:opacity-100 transition-all">
          <ZoomIn className="w-4 h-4" />
        </div>

        {/* Nav arrows (if multiple) */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-white transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActive((a) => (a + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-white transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200",
                active === i
                  ? "border-[#2563eb] shadow-[0_0_16px_rgba(37,99,235,0.3)]"
                  : "border-white/8 opacity-60 hover:opacity-100 hover:border-white/20"
              )}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
