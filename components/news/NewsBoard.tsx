"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Calendar, Tag, Sparkles, Newspaper, ArrowRight } from "lucide-react";

interface Post {
  id: number;
  title: string;
  content: string;
  category: "news" | "event" | "promotion";
  business_slug: string | null;
  business_name: string | null;
  image_url: string | null;
  created_at: string;
}

const categoryConfig: Record<string, { color: string; icon: typeof Tag }> = {
  news: { color: "bg-blue-100 text-blue-700", icon: Newspaper },
  event: { color: "bg-purple-100 text-purple-700", icon: Calendar },
  promotion: { color: "bg-rose-100 text-rose-700", icon: Sparkles },
};

export default function NewsBoard() {
  const t = useTranslations("news");
  const locale = useLocale();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((d) => { if (d.posts) setPosts(d.posts); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all" ? posts : posts.filter((p) => p.category === filter);
  const categories = ["all", "news", "event", "promotion"];
  const catLabel = (c: string) =>
    c === "all" ? t("all") : c === "news" ? t("categoryNews") : c === "event" ? t("categoryEvent") : t("categoryPromotion");

  function formatDate(dateStr: string) {
    const localeMap: Record<string, string> = { en: "en-US", ko: "ko-KR", ja: "ja-JP", zh: "zh-CN" };
    return new Date(dateStr).toLocaleDateString(localeMap[locale] || "en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  return (
    <div className="min-h-screen bg-busan-bg pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">KBeautyBusan</span>
          <h1 className="mt-3 font-display text-4xl font-bold text-busan-secondary sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-busan-secondary/45">{t("subtitle")}</p>
        </div>

        {/* Category Filter */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                filter === c
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/20"
                  : "border border-amber-200/60 bg-white/70 text-amber-700 hover:border-amber-300 hover:bg-amber-50/80"
              }`}
            >
              {catLabel(c)}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="mt-16 text-center text-busan-secondary/40">···</div>
        ) : filtered.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-dashed border-amber-200 py-20 text-center">
            <Newspaper size={40} className="mx-auto mb-3 text-amber-200" />
            <p className="text-busan-secondary/40">{t("noPosts")}</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => {
              const conf = categoryConfig[post.category] || categoryConfig.news;
              const Icon = conf.icon;
              return (
                <article
                  key={post.id}
                  className={`card-hover group animate-fade-in-up overflow-hidden rounded-2xl border border-amber-100/60 bg-white/80 opacity-0 shadow-luxury backdrop-blur-sm stagger-${(i % 6) + 1}`}
                >
                  {post.image_url ? (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img src={post.image_url} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      <div className="absolute left-3 top-3">
                        <span className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold ${conf.color}`}>
                          <Icon size={11} /> {catLabel(post.category)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-amber-100 via-amber-50 to-rose-50">
                      <Icon size={40} className="text-amber-300" />
                      <div className="absolute left-3 top-3">
                        <span className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold ${conf.color}`}>
                          <Icon size={11} /> {catLabel(post.category)}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-busan-secondary/40">
                      <Calendar size={12} /> {formatDate(post.created_at)}
                    </div>
                    <h2 className="mt-2 font-display text-xl font-bold leading-tight text-busan-secondary">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-busan-secondary/55">
                      {post.content}
                    </p>

                    {post.business_slug && post.business_name && (
                      <Link
                        href={`/business/${post.business_slug}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 transition-colors hover:text-amber-700"
                      >
                        <Tag size={12} /> {post.business_name}
                        <ArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
