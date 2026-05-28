"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { businesses } from "@/data/businesses";
import { Newspaper, Calendar, Sparkles, Trash2, Plus } from "lucide-react";

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

const catConfig: Record<string, { color: string; icon: typeof Newspaper }> = {
  news: { color: "bg-blue-100 text-blue-700", icon: Newspaper },
  event: { color: "bg-purple-100 text-purple-700", icon: Calendar },
  promotion: { color: "bg-rose-100 text-rose-700", icon: Sparkles },
};

export default function PostManager() {
  const t = useTranslations("admin");
  const tNews = useTranslations("news");
  const [posts, setPosts] = useState<Post[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "news",
    businessSlug: "",
    imageUrl: "",
  });

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const selectedBiz = businesses.find((b) => b.slug === form.businessSlug);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          category: form.category,
          businessSlug: form.businessSlug || undefined,
          businessName: selectedBiz?.name || undefined,
          imageUrl: form.imageUrl || undefined,
        }),
      });
      if (res.ok) {
        setMessage(t("postSuccess"));
        setForm({ title: "", content: "", category: "news", businessSlug: "", imageUrl: "" });
        fetchPosts();
        setTimeout(() => setMessage(null), 4000);
      }
    } catch { /* ignore */ } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm(t("deleteConfirm"))) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    fetchPosts();
  }

  const catLabel = (c: string) =>
    c === "news" ? tNews("categoryNews") : c === "event" ? tNews("categoryEvent") : tNews("categoryPromotion");

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Create Form */}
      <div className="rounded-2xl border border-amber-100/60 bg-white/90 p-6 shadow-luxury-lg">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-busan-secondary">
          <Plus size={20} className="text-amber-600" /> {t("createPost")}
        </h2>

        {message && (
          <div className="mt-4 rounded-xl bg-green-50 p-3 text-sm font-medium text-green-700">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Category */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-busan-secondary/60">{t("postCategory")}</label>
            <div className="flex gap-2">
              {(["news", "event", "promotion"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, category: c }))}
                  className={`flex-1 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                    form.category === c ? catConfig[c].color : "border border-amber-200/60 text-busan-secondary/50"
                  }`}
                >
                  {catLabel(c)}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-busan-secondary/60">{t("postTitle")}</span>
            <input
              type="text" required
              placeholder={t("postTitlePlaceholder")}
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className="w-full rounded-xl border border-amber-200/60 bg-amber-50/30 px-4 py-2.5 text-sm text-busan-secondary outline-none transition-all placeholder:text-busan-secondary/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
            />
          </label>

          {/* Content */}
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-busan-secondary/60">{t("postContent")}</span>
            <textarea
              required rows={5}
              placeholder={t("postContentPlaceholder")}
              value={form.content}
              onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
              className="w-full resize-none rounded-xl border border-amber-200/60 bg-amber-50/30 px-4 py-2.5 text-sm text-busan-secondary outline-none transition-all placeholder:text-busan-secondary/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
            />
          </label>

          {/* Business */}
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-busan-secondary/60">{t("postBusiness")}</span>
            <select
              value={form.businessSlug}
              onChange={(e) => setForm((p) => ({ ...p, businessSlug: e.target.value }))}
              className="w-full rounded-xl border border-amber-200/60 bg-amber-50/30 px-4 py-2.5 text-sm text-busan-secondary outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
            >
              <option value="">{t("postBusinessNone")}</option>
              {businesses.map((b) => (
                <option key={b.slug} value={b.slug}>{b.name} ({b.nameKo})</option>
              ))}
            </select>
          </label>

          {/* Image URL */}
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-busan-secondary/60">{t("postImage")}</span>
            <input
              type="url"
              placeholder={t("postImagePlaceholder")}
              value={form.imageUrl}
              onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
              className="w-full rounded-xl border border-amber-200/60 bg-amber-50/30 px-4 py-2.5 text-sm text-busan-secondary outline-none transition-all placeholder:text-busan-secondary/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
            />
          </label>

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
            {submitting ? t("postSubmitting") : t("postSubmit")}
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div className="rounded-2xl border border-amber-100/60 bg-white/90 p-6 shadow-luxury-lg">
        <h2 className="font-display text-xl font-bold text-busan-secondary">{t("postList")}</h2>
        {posts.length === 0 ? (
          <p className="mt-8 text-center text-sm text-busan-secondary/40">{t("noPostsAdmin")}</p>
        ) : (
          <div className="mt-5 max-h-[600px] space-y-3 overflow-y-auto pr-1">
            {posts.map((post) => {
              const conf = catConfig[post.category] || catConfig.news;
              const Icon = conf.icon;
              return (
                <div key={post.id} className="rounded-xl border border-amber-100/50 bg-amber-50/20 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-semibold ${conf.color}`}>
                      <Icon size={10} /> {catLabel(post.category)}
                    </span>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="rounded-lg p-1.5 text-busan-secondary/30 transition-colors hover:bg-red-50 hover:text-red-500"
                      title={t("delete")}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-busan-secondary">{post.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-busan-secondary/50">{post.content}</p>
                  {post.business_name && (
                    <span className="mt-2 inline-block text-[11px] font-medium text-amber-600">📍 {post.business_name}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
