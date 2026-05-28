"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Menu, X, ChevronDown } from "lucide-react";

const localeFlags: Record<string, string> = {
  en: "🇺🇸",
  ko: "🇰🇷",
  ja: "🇯🇵",
  zh: "🇨🇳",
};

export default function Header() {
  const t = useTranslations("header");
  const tLang = useTranslations("lang");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale as "en" | "ko" | "ja" | "zh" });
    setLangOpen(false);
    setMobileOpen(false);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-effect-strong border-b border-amber-200/50 shadow-luxury py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="group flex items-baseline gap-0.5">
          <span className="font-display text-2xl font-bold tracking-tight text-busan-secondary lg:text-3xl">
            KBEAUTY
          </span>
          <span className="font-display text-2xl font-bold tracking-tight text-busan-primary lg:text-3xl">
            BUSAN
          </span>
          <span className="ml-2.5 hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-600/60 sm:inline-block">
            {t("subtitle")}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-busan-secondary/70 transition-colors hover:text-busan-primary"
          >
            {t("home")}
          </Link>
          <Link
            href="/#catalog"
            className="text-sm font-medium text-busan-secondary/70 transition-colors hover:text-busan-primary"
          >
            {t("catalog")}
          </Link>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 rounded-full border border-amber-300/50 px-3 py-1.5 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-50"
            >
              <span>{localeFlags[locale]}</span>
              <span>{tLang(locale as "en" | "ko" | "ja" | "zh")}</span>
              <ChevronDown size={12} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-xl border border-amber-100 bg-white/95 shadow-luxury-lg backdrop-blur-sm">
                {(["en", "ko", "ja", "zh"] as const).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors hover:bg-amber-50 ${
                      locale === loc ? "bg-amber-50 font-semibold text-busan-primary" : "text-busan-secondary/70"
                    }`}
                  >
                    <span>{localeFlags[loc]}</span>
                    {tLang(loc)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-busan-secondary transition-colors hover:bg-amber-50 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="glass-effect-strong animate-slide-up border-t border-amber-100/50 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-busan-secondary/80 transition-colors hover:bg-amber-50"
            >
              {t("home")}
            </Link>
            <Link
              href="/#catalog"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-busan-secondary/80 transition-colors hover:bg-amber-50"
            >
              {t("catalog")}
            </Link>
            <div className="mt-2 flex flex-wrap gap-2 px-4">
              {(["en", "ko", "ja", "zh"] as const).map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    locale === loc
                      ? "border border-amber-400 bg-amber-50 text-amber-700"
                      : "text-amber-600/50 hover:text-amber-700"
                  }`}
                >
                  {localeFlags[loc]} {tLang(loc)}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
