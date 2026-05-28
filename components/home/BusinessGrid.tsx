"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  type CategoryType,
  getBusinessesByCategory,
} from "@/data/businesses";
import CategoryFilter from "./CategoryFilter";
import BusinessCard from "@/components/business/BusinessCard";

export default function BusinessGrid() {
  const t = useTranslations("catalog");
  const [selected, setSelected] = useState<CategoryType | "all">("all");
  const filtered = getBusinessesByCategory(selected);

  return (
    <section id="catalog" className="relative py-20 lg:py-28">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
        <div className="absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-amber-100/20 blur-3xl" />
        <div className="absolute -left-32 bottom-1/4 h-80 w-80 rounded-full bg-rose-100/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
            {t("label")}
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-busan-secondary sm:text-5xl">
            {t("heading", { gold: "" })}<span className="gold-gradient-text">{t("gold")}</span>{" "}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-busan-secondary/45">
            {t("subheading")}
          </p>
        </div>

        <div className="mb-10">
          <CategoryFilter selected={selected} onSelect={setSelected} />
        </div>

        <div key={selected} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((biz, i) => (
            <BusinessCard key={biz.id} business={biz} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <span className="text-4xl">🔍</span>
            <p className="mt-4 text-lg text-busan-secondary/50">{t("noResults")}</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-sm text-busan-secondary/40">{t("comingSoon")}</p>
        </div>
      </div>
    </section>
  );
}
