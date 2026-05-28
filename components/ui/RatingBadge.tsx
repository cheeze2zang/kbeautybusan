import { cn } from "@/lib/utils";

interface RatingBadgeProps {
  rating: number;
  className?: string;
}

export default function RatingBadge({ rating, className }: RatingBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-lg bg-amber-500 px-2 py-1 text-xs font-bold text-white shadow-md",
        className
      )}
    >
      ⭐ {rating.toFixed(1)}
    </span>
  );
}
