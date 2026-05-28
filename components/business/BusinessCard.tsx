"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  type Business,
  categoryLabels,
  districtLabels,
} from "@/data/businesses";
import { formatKRW, formatUSD } from "@/lib/utils";
import RatingBadge from "@/components/ui/RatingBadge";

interface BusinessCardProps {
  business: Business;
  index: number;
}

export default function BusinessCard({ business, index }: BusinessCardProps) {
  const t = useTranslations("categories");
  const tC = useTranslations("catalog");
  const locale = useLocale();
  const district = districtLabels[business.district];
  const catEmoji = categoryLabels[business.category].emoji;
  const catLabel = t(business.category);
  const displayName = locale === "ko" ? business.nameKo : business.name;

  return (
    <Link
      href={`/business/${business.slug}`}
      className={`card-hover group block animate-fade-in-up opacity-0 stagger-${index + 1}`}
    >
      <article className="overflow-hidden rounded-2xl border border-amber-100/60 bg-white/80 shadow-luxury backdrop-blur-sm transition-all duration-500 group-hover:border-amber-200/80 group-hover:bg-white">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={business.thumbnailUrl}
            alt={displayName}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <div className="absolute left-3 top-3">
            <span className="glass-effect rounded-lg border border-white/30 px-2.5 py-1 text-[11px] font-semibold text-busan-secondary shadow-sm">
              📍 {locale === "ko" ? district.ko : district.en}
            </span>
          </div>
          <div className="absolute right-3 top-3">
            <RatingBadge rating={business.rating} />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">{catEmoji}</span>
            <span className="text-xs font-medium text-amber-600/80">{catLabel}</span>
          </div>
          <h3 className="mt-2 font-display text-xl font-bold leading-tight text-busan-secondary transition-colors group-hover:text-busan-primary">
            {displayName}
          </h3>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg font-bold text-busan-primary">
              ₩{formatKRW(business.priceKRW)}
            </span>
            <span className="text-sm text-busan-secondary/40">
              {formatUSD(business.priceUSD)}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-amber-100/50 pt-3">
            <span className="text-[11px] text-busan-secondary/40">
              {business.reviewCount} {tC("reviews")}
            </span>
            <span className="text-xs font-semibold text-amber-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {tC("viewDetails")}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
