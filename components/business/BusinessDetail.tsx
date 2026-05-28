"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  type Business,
  categoryLabels,
  districtLabels,
} from "@/data/businesses";
import { formatKRW, formatUSD } from "@/lib/utils";
import RatingBadge from "@/components/ui/RatingBadge";
import BookingModal from "@/components/booking/BookingModal";
import ReviewSection from "@/components/review/ReviewSection";
import { ArrowLeft, Clock, Phone, MapPin, Globe, ExternalLink, Instagram } from "lucide-react";

interface BusinessDetailProps {
  business: Business;
}

export default function BusinessDetail({ business }: BusinessDetailProps) {
  const t = useTranslations("detail");
  const tCat = useTranslations("categories");
  const [bookingOpen, setBookingOpen] = useState(false);
  const locale = useLocale();
  const cat = categoryLabels[business.category];
  const district = districtLabels[business.district];

  const displayName = locale === "ko" ? business.nameKo : business.name;
  const subName = locale === "ko" ? business.name : business.nameKo;
  const desc = locale === "ko" ? business.descriptionKo : business.description;
  const addr = locale === "ko" ? business.addressKo : business.address;

  return (
    <div className="min-h-screen bg-busan-bg pt-24">
      <div className="relative overflow-hidden">
        <div className="relative h-64 sm:h-80 lg:h-96">
          <img
            src={business.thumbnailUrl}
            alt={displayName}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-busan-bg via-busan-bg/30 to-transparent" />
        </div>
        <div className="absolute left-4 top-4 sm:left-8 sm:top-8">
          <Link
            href="/"
            className="glass-effect inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-sm font-medium text-busan-secondary shadow-lg transition-all hover:bg-white/95"
          >
            <ArrowLeft size={16} />
            {t("back")}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="-mt-20 relative z-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-amber-100/60 bg-white/90 shadow-luxury-lg backdrop-blur-sm">
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                    {cat.emoji} {tCat(business.category)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-busan-secondary">
                    📍 {locale === "ko" ? district.ko : district.en}
                  </span>
                  <RatingBadge rating={business.rating} />
                </div>

                <h1 className="mt-5 font-display text-3xl font-bold text-busan-secondary sm:text-4xl lg:text-5xl">
                  {displayName}
                </h1>
                <p className="mt-1 text-lg text-busan-secondary/40">{subName}</p>

                <p className="mt-6 text-base leading-relaxed text-busan-secondary/60">{desc}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl bg-amber-50/50 p-4">
                    <Clock size={18} className="text-amber-600" />
                    <div>
                      <div className="text-xs text-busan-secondary/40">{t("hours")}</div>
                      <div className="text-sm font-medium text-busan-secondary">{business.openHours}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-amber-50/50 p-4">
                    <Phone size={18} className="text-amber-600" />
                    <div>
                      <div className="text-xs text-busan-secondary/40">{t("phone")}</div>
                      <div className="text-sm font-medium text-busan-secondary">{business.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-amber-50/50 p-4">
                    <MapPin size={18} className="text-amber-600" />
                    <div>
                      <div className="text-xs text-busan-secondary/40">{t("address")}</div>
                      <div className="text-sm font-medium text-busan-secondary">{addr}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-amber-50/50 p-4">
                    <Globe size={18} className="text-amber-600" />
                    <div>
                      <div className="text-xs text-busan-secondary/40">{t("languages")}</div>
                      <div className="text-sm font-medium text-busan-secondary">{business.languages.join(", ")}</div>
                    </div>
                  </div>
                </div>
              </div>

              {business.youtubeChannelId && (
                <div className="border-t border-amber-100/50 p-6 sm:p-8">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-red-500" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    <h2 className="font-display text-2xl font-bold text-busan-secondary">{t("videoTitle")}</h2>
                  </div>
                  <p className="mt-1 text-sm text-busan-secondary/40">{t("videoDesc")}</p>
                  <div className="mt-5 aspect-video overflow-hidden rounded-2xl border border-amber-100/60 shadow-luxury">
                    <iframe
                      title={`${business.name} YouTube`}
                      src={`https://www.youtube-nocookie.com/embed/videoseries?list=UU${business.youtubeChannelId.slice(2)}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              <div className="border-t border-amber-100/50 p-6 sm:p-8">
                <h2 className="font-display text-2xl font-bold text-busan-secondary">{t("servicesTitle")}</h2>
                <div className="mt-6 space-y-3">
                  {business.services.map((svc, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl border border-amber-100/40 bg-amber-50/30 p-4 transition-colors hover:bg-amber-50/60">
                      <div>
                        <div className="font-medium text-busan-secondary">
                          {locale === "ko" ? svc.nameKo : svc.name}
                        </div>
                        <div className="mt-0.5 flex items-center gap-2 text-xs text-busan-secondary/40">
                          <span>{locale === "ko" ? svc.name : svc.nameKo}</span>
                          <span>·</span>
                          <span>{svc.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-busan-primary">₩{formatKRW(svc.priceKRW)}</div>
                        <div className="text-xs text-busan-secondary/40">{formatUSD(svc.priceUSD)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <ReviewSection businessSlug={business.slug} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="sticky top-28 space-y-6">
              <div className="overflow-hidden rounded-2xl border border-amber-100/60 bg-white/90 shadow-luxury-lg backdrop-blur-sm">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-5">
                  <div className="text-center">
                    <div className="text-xs font-medium text-white/70">{t("startingFrom")}</div>
                    <div className="mt-1 text-3xl font-bold text-white">₩{formatKRW(business.priceKRW)}</div>
                    <div className="text-sm text-white/60">{formatUSD(business.priceUSD)}</div>
                  </div>
                </div>
                <div className="p-5">
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="w-full rounded-xl bg-busan-secondary py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-busan-secondary/90 hover:shadow-lg"
                  >
                    {t("bookNow")}
                  </button>
                  {business.kakaoUrl && (
                    <a href={business.kakaoUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-yellow-300 bg-yellow-50 py-3 text-sm font-semibold text-yellow-800 transition-colors hover:bg-yellow-100">
                      💬 {t("kakaoTalk")}
                    </a>
                  )}
                  <div className="mt-4 text-center text-[11px] text-busan-secondary/30">{t("freeCancel")}</div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-amber-100/60 bg-white/90 shadow-luxury backdrop-blur-sm">
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-busan-secondary">{t("location")}</h3>
                  <p className="mt-2 text-sm text-busan-secondary/50">{business.addressKo}</p>
                  <div className="mt-4 aspect-video overflow-hidden rounded-xl">
                    <iframe
                      title={`${business.name} location`}
                      src={`https://maps.google.com/maps?q=${business.lat},${business.lng}&z=16&output=embed`}
                      width="100%" height="100%" style={{ border: 0 }}
                      allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <a href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-amber-200/60 py-2.5 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-50">
                    <ExternalLink size={14} />{t("openMaps")}
                  </a>
                </div>
              </div>

              {(business.instagramUrl || business.youtubeUrl || business.blogUrl || business.facebookUrl || business.websiteUrl) && (
                <div className="overflow-hidden rounded-2xl border border-amber-100/60 bg-white/90 shadow-luxury backdrop-blur-sm">
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-busan-secondary">{t("follow")}</h3>
                    <div className="mt-3 space-y-2.5">
                      {business.instagramUrl && (
                        <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-pink-200/60 bg-gradient-to-r from-pink-50 to-purple-50 p-3.5 transition-colors hover:from-pink-100 hover:to-purple-100">
                          <Instagram size={18} className="text-pink-500" /><span className="text-sm font-medium text-busan-secondary">Instagram</span><ExternalLink size={12} className="ml-auto text-busan-secondary/30" />
                        </a>
                      )}
                      {business.youtubeUrl && (
                        <a href={business.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-red-200/60 bg-gradient-to-r from-red-50 to-orange-50 p-3.5 transition-colors hover:from-red-100 hover:to-orange-100">
                          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-red-500" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                          <span className="text-sm font-medium text-busan-secondary">YouTube</span><ExternalLink size={12} className="ml-auto text-busan-secondary/30" />
                        </a>
                      )}
                      {business.blogUrl && (
                        <a href={business.blogUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-green-200/60 bg-gradient-to-r from-green-50 to-emerald-50 p-3.5 transition-colors hover:from-green-100 hover:to-emerald-100">
                          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-green-600" fill="currentColor"><path d="M3 3v18h18V3H3zm15 14H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2z"/></svg>
                          <span className="text-sm font-medium text-busan-secondary">Blog</span><ExternalLink size={12} className="ml-auto text-busan-secondary/30" />
                        </a>
                      )}
                      {business.facebookUrl && (
                        <a href={business.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-blue-200/60 bg-gradient-to-r from-blue-50 to-indigo-50 p-3.5 transition-colors hover:from-blue-100 hover:to-indigo-100">
                          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-blue-600" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                          <span className="text-sm font-medium text-busan-secondary">Facebook</span><ExternalLink size={12} className="ml-auto text-busan-secondary/30" />
                        </a>
                      )}
                      {business.websiteUrl && (
                        <a href={business.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-amber-200/60 bg-gradient-to-r from-amber-50 to-yellow-50 p-3.5 transition-colors hover:from-amber-100 hover:to-yellow-100">
                          <Globe size={18} className="text-amber-600" /><span className="text-sm font-medium text-busan-secondary">Website</span><ExternalLink size={12} className="ml-auto text-busan-secondary/30" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-20" />
      </div>

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        businessSlug={business.slug}
        businessName={displayName}
      />
    </div>
  );
}
