import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations("footer");
  const tH = useTranslations("header");

  return (
    <footer className="relative overflow-hidden bg-busan-secondary text-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-baseline gap-0.5">
              <span className="font-display text-2xl font-bold text-white">KBEAUTY</span>
              <span className="font-display text-2xl font-bold text-amber-400">BUSAN</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-indigo-200/60">
              {t("description")}
            </p>
            <div className="flex gap-3 pt-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm">📷</span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm">💬</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400/80">
              {t("quickLinks")}
            </h3>
            <nav className="flex flex-col gap-2.5">
              <Link href="/" className="text-sm text-indigo-200/60 transition-colors hover:text-amber-300">
                {tH("home")}
              </Link>
              <Link href="/#catalog" className="text-sm text-indigo-200/60 transition-colors hover:text-amber-300">
                {tH("catalog")}
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400/80">
              {t("contact")}
            </h3>
            <div className="space-y-3 text-sm text-indigo-200/60">
              <p>{t("location")}</p>
              <p>{t("email")}</p>
              <p>{t("phone")}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-indigo-200/40">{t("copyright")}</p>
          <div className="flex gap-6 text-xs text-indigo-200/40">
            <span className="cursor-pointer transition-colors hover:text-amber-300">{t("privacy")}</span>
            <span className="cursor-pointer transition-colors hover:text-amber-300">{t("terms")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
