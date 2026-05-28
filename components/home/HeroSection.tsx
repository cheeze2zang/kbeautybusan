"use client";

import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="noise-overlay relative min-h-[92vh] overflow-hidden bg-busan-bg pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-32 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute -right-16 top-16 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-rose-100/20 blur-3xl" />
        <div className="animate-float absolute left-[15%] top-[30%] h-2 w-2 rounded-full bg-amber-400/40" />
        <div className="animate-float-delayed absolute left-[70%] top-[20%] h-3 w-3 rounded-full bg-amber-300/30" />
        <div className="animate-float absolute left-[80%] top-[60%] h-1.5 w-1.5 rounded-full bg-rose-300/40" />
        <div className="animate-float-delayed absolute left-[25%] top-[70%] h-2.5 w-2.5 rounded-full bg-amber-500/20" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(217,119,6,1) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid min-h-[70vh] items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8 py-12">
            <div className="animate-fade-in-up opacity-0">
              <span className="glass-effect inline-flex items-center gap-2 rounded-full border border-amber-200/60 px-4 py-2 text-xs font-semibold tracking-wide text-amber-700 shadow-luxury">
                <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-amber-500" />
                {t("badge")}
              </span>
            </div>

            <div className="animate-fade-in-up opacity-0 stagger-2 relative">
              <span className="absolute -left-2 -top-6 font-display text-[5rem] font-bold leading-none tracking-tighter text-amber-100/40 sm:text-[7rem] lg:-left-4 lg:-top-8 lg:text-[9rem]">
                KB
              </span>
            </div>

            <div className="animate-fade-in-up opacity-0 stagger-3 relative">
              <h1 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-busan-secondary sm:text-4xl lg:text-5xl">
                {t("discover")}{" "}
                <span className="gold-gradient-text">{t("premium")}</span>
                <br />
                {t("kbeautyIn")}{" "}
                <span className="relative inline-block">
                  <span className="gold-gradient-text">{t("busan")}</span>
                  <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
                </span>
              </h1>
            </div>

            <div className="animate-fade-in-up opacity-0 stagger-4">
              <p className="text-lg leading-relaxed text-busan-secondary/50 sm:text-xl">
                {t("subtitle")}
              </p>
              <p className="mt-1 text-base text-amber-600/70">{t("services")}</p>
            </div>

            <div className="animate-fade-in-up opacity-0 stagger-5 flex flex-wrap gap-4">
              <a href="#catalog" className="btn-primary text-sm">{t("explore")}</a>
              <a
                href="#catalog"
                className="rounded-xl border border-amber-300/50 px-8 py-3.5 text-sm font-semibold text-amber-700 transition-all duration-300 hover:border-amber-400 hover:bg-amber-50"
              >
                {t("viewAll")}
              </a>
            </div>

            <div className="animate-fade-in-up opacity-0 stagger-6 flex gap-8 pt-4 sm:gap-12">
              <div>
                <div className="font-display text-3xl font-bold text-busan-secondary sm:text-4xl">
                  20<span className="text-busan-primary">+</span>
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-busan-secondary/40">
                  {t("statVenues")}
                </div>
              </div>
              <div className="h-12 w-px bg-amber-200/50" />
              <div>
                <div className="font-display text-3xl font-bold text-busan-secondary sm:text-4xl">
                  5K<span className="text-busan-primary">+</span>
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-busan-secondary/40">
                  {t("statCustomers")}
                </div>
              </div>
              <div className="h-12 w-px bg-amber-200/50" />
              <div>
                <div className="font-display text-3xl font-bold text-busan-secondary sm:text-4xl">4</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-busan-secondary/40">
                  {t("statLanguages")}
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in opacity-0 stagger-4 relative hidden lg:block">
            <div className="relative">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] border border-amber-200/40 shadow-luxury-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-amber-50 to-rose-50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="mb-4 text-7xl">✨</div>
                  <div className="font-display text-3xl font-bold text-busan-secondary/20">KBEAUTY</div>
                  <div className="font-display text-3xl font-bold text-amber-500/30">BUSAN</div>
                  <div className="mt-6 h-px w-16 bg-amber-300/40" />
                  <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-amber-600/40">Premium Beauty</p>
                </div>
                <div className="shimmer-bg absolute inset-0" />
              </div>
              <div className="animate-float absolute -left-8 top-16 rounded-2xl border border-amber-200/50 bg-white/90 px-4 py-3 shadow-luxury backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">💆</span>
                  <div>
                    <div className="text-xs font-semibold text-busan-secondary">Top Rated</div>
                    <div className="text-[10px] text-amber-600">⭐ 4.9 · Haeundae</div>
                  </div>
                </div>
              </div>
              <div className="animate-float-delayed absolute -right-6 bottom-24 rounded-2xl border border-amber-200/50 bg-white/90 px-4 py-3 shadow-luxury backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🧖</span>
                  <div>
                    <div className="text-xs font-semibold text-busan-secondary">Verified</div>
                    <div className="text-[10px] text-amber-600">Video Confirmed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-busan-bg to-transparent" />
    </section>
  );
}
