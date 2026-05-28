"use client";

import { useTranslations } from "next-intl";
import { type CategoryType, categoryLabels } from "@/data/businesses";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selected: CategoryType | "all";
  onSelect: (cat: CategoryType | "all") => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const t = useTranslations("categories");
  const tC = useTranslations("catalog");

  const categories: Array<{ key: CategoryType | "all"; emoji: string }> = [
    { key: "all", emoji: "🔥" },
    ...Object.entries(categoryLabels).map(([key, val]) => ({
      key: key as CategoryType,
      emoji: val.emoji,
    })),
  ];

  return (
    <div className="scrollbar-hide flex gap-2.5 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">
      {categories.map((cat) => {
        const active = selected === cat.key;
        const label = cat.key === "all" ? tC("all") : t(cat.key);
        return (
          <button
            key={cat.key}
            onClick={() => onSelect(cat.key)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300",
              active
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/20"
                : "border border-amber-200/60 bg-white/70 text-amber-700 hover:border-amber-300 hover:bg-amber-50/80 hover:shadow-luxury"
            )}
          >
            <span className="text-base">{cat.emoji}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
