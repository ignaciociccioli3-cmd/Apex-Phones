import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  count?: number;
  size?: "sm" | "md";
  className?: string;
}

export function Rating({ value, count, size = "sm", className }: RatingProps) {
  const starSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              starSize,
              i < Math.floor(value) ? "text-[#fbbf24] fill-[#fbbf24]" : "text-[#3f3f3f] fill-[#3f3f3f]"
            )}
          />
        ))}
      </div>
      <span className={cn("font-semibold text-[#f8f8f8]", textSize)}>{value.toFixed(1)}</span>
      {count !== undefined && (
        <span className={cn("text-[#71717a]", textSize)}>({count.toLocaleString("es-AR")})</span>
      )}
    </div>
  );
}
