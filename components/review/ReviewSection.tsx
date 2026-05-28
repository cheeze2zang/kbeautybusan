"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Star, ThumbsUp, ChevronDown, ChevronUp, MessageSquarePlus } from "lucide-react";

interface Review {
  id: number;
  business_slug: string;
  reviewer_name: string;
  rating: number;
  comment: string | null;
  language: string;
  helpful_count: number;
  created_at: string;
}

interface ReviewSectionProps {
  businessSlug: string;
}

const langFlags: Record<string, string> = { en: "🇺🇸", ko: "🇰🇷", ja: "🇯🇵", zh: "🇨🇳" };

function StarRating({ rating, size = 16, interactive, onChange }: {
  rating: number; size?: number; interactive?: boolean; onChange?: (r: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type={interactive ? "button" : undefined}
          disabled={!interactive}
          onMouseEnter={() => interactive && setHover(i + 1)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onChange?.(i + 1)}
          className={interactive ? "cursor-pointer transition-transform hover:scale-110" : "cursor-default"}
        >
          <Star
            size={size}
            className={
              i < (hover || rating)
                ? "fill-amber-400 text-amber-400"
                : "text-amber-200"
            }
          />
        </button>
      ))}
    </div>
  );
}

function timeAgo(dateStr: string, locale: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  if (locale === "ko") {
    if (mins < 1) return "방금 전";
    if (mins < 60) return `${mins}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 30) return `${days}일 전`;
    return new Date(dateStr).toLocaleDateString("ko-KR");
  }
  if (locale === "ja") {
    if (mins < 1) return "たった今";
    if (mins < 60) return `${mins}分前`;
    if (hours < 24) return `${hours}時間前`;
    if (days < 30) return `${days}日前`;
    return new Date(dateStr).toLocaleDateString("ja-JP");
  }
  if (locale === "zh") {
    if (mins < 1) return "刚刚";
    if (mins < 60) return `${mins}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 30) return `${days}天前`;
    return new Date(dateStr).toLocaleDateString("zh-CN");
  }
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US");
}

export default function ReviewSection({ businessSlug }: ReviewSectionProps) {
  const t = useTranslations("review");
  const locale = useLocale();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [form, setForm] = useState({ name: "", rating: 0, comment: "" });
  const [helpedIds, setHelpedIds] = useState<Set<number>>(new Set());

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?slug=${businessSlug}`);
      const data = await res.json();
      if (data.reviews) setReviews(data.reviews);
    } catch { /* ignore */ }
  }, [businessSlug]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.rating === 0) return;
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessSlug,
          reviewerName: form.name,
          rating: form.rating,
          comment: form.comment || undefined,
          language: locale,
        }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: t("success") });
        setForm({ name: "", rating: 0, comment: "" });
        setFormOpen(false);
        fetchReviews();
      } else {
        setMessage({ type: "error", text: t("error") });
      }
    } catch {
      setMessage({ type: "error", text: t("error") });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleHelpful(id: number) {
    if (helpedIds.has(id)) return;
    setHelpedIds((prev) => new Set(prev).add(id));
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, helpful_count: r.helpful_count + 1 } : r));
    await fetch("/api/reviews/helpful", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const visible = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div className="border-t border-amber-100/50 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-busan-secondary">{t("title")}</h2>
          {reviews.length > 0 && (
            <div className="mt-2 flex items-center gap-3">
              <StarRating rating={Math.round(avgRating)} size={18} />
              <span className="text-lg font-bold text-busan-secondary">{avgRating.toFixed(1)}</span>
              <span className="text-sm text-busan-secondary/40">
                {t("totalReviews", { count: reviews.length })}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => { setFormOpen(!formOpen); setMessage(null); }}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:from-amber-600 hover:to-amber-700"
        >
          <MessageSquarePlus size={16} />
          {t("writeReview")}
        </button>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`mt-4 rounded-xl p-3 text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
          {message.text}
        </div>
      )}

      {/* Write Review Form */}
      {formOpen && (
        <form onSubmit={handleSubmit} className="mt-6 animate-slide-up rounded-2xl border border-amber-200/60 bg-amber-50/30 p-5">
          <div className="space-y-4">
            {/* Rating */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-busan-secondary/60">{t("yourRating")}</label>
              <StarRating rating={form.rating} size={28} interactive onChange={(r) => setForm((p) => ({ ...p, rating: r }))} />
            </div>

            {/* Name */}
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-busan-secondary/60">{t("name")}</span>
              <input
                type="text" required
                placeholder={t("namePlaceholder")}
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full rounded-xl border border-amber-200/60 bg-white px-4 py-2.5 text-sm text-busan-secondary outline-none transition-all placeholder:text-busan-secondary/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
              />
            </label>

            {/* Comment */}
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-busan-secondary/60">{t("comment")}</span>
              <textarea
                rows={3}
                placeholder={t("commentPlaceholder")}
                value={form.comment}
                onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
                className="w-full resize-none rounded-xl border border-amber-200/60 bg-white px-4 py-2.5 text-sm text-busan-secondary outline-none transition-all placeholder:text-busan-secondary/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
              />
            </label>

            <button
              type="submit"
              disabled={submitting || form.rating === 0}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? t("submitting") : t("submit")}
            </button>
          </div>
        </form>
      )}

      {/* Review List */}
      {reviews.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-amber-200 py-12 text-center">
          <Star size={32} className="mx-auto mb-3 text-amber-200" />
          <p className="text-sm text-busan-secondary/40">{t("noReviews")}</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {visible.map((review) => (
            <div key={review.id} className="rounded-2xl border border-amber-100/50 bg-white/60 p-5 transition-colors hover:bg-white/80">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200 text-sm font-bold text-amber-700">
                    {review.reviewer_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-busan-secondary">{review.reviewer_name}</span>
                      <span className="text-xs" title={review.language}>{langFlags[review.language] || "🌐"}</span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <StarRating rating={review.rating} size={13} />
                      <span className="text-xs text-busan-secondary/30">{timeAgo(review.created_at, locale)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {review.comment && (
                <p className="mt-3 text-sm leading-relaxed text-busan-secondary/70">{review.comment}</p>
              )}

              <div className="mt-3 flex items-center gap-4">
                <button
                  onClick={() => handleHelpful(review.id)}
                  disabled={helpedIds.has(review.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    helpedIds.has(review.id)
                      ? "bg-amber-100 text-amber-600"
                      : "text-busan-secondary/40 hover:bg-amber-50 hover:text-amber-600"
                  }`}
                >
                  <ThumbsUp size={12} />
                  {t("helpful")} {review.helpful_count > 0 && `(${review.helpful_count})`}
                </button>
              </div>
            </div>
          ))}

          {reviews.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-200/50 py-3 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-50"
            >
              {showAll ? (
                <><ChevronUp size={16} /> {t("showLess")}</>
              ) : (
                <><ChevronDown size={16} /> {t("showMore")} ({reviews.length - 3})</>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
