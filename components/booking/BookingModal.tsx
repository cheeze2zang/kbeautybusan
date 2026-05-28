"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { X, Calendar, Clock, Users, User, Phone, Mail, MessageSquare, CheckCircle2, XCircle } from "lucide-react";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  businessSlug: string;
  businessName: string;
}

type FormState = "form" | "submitting" | "success" | "error";

export default function BookingModal({ open, onClose, businessSlug, businessName }: BookingModalProps) {
  const t = useTranslations("booking");
  const [state, setState] = useState<FormState>("form");
  const [form, setForm] = useState({
    visitDate: "",
    visitTime: "",
    guests: 1,
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    specialRequests: "",
  });

  if (!open) return null;

  function update(field: string, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessSlug,
          businessName,
          customerName: form.customerName,
          customerPhone: form.customerPhone,
          customerEmail: form.customerEmail || undefined,
          visitDate: form.visitDate,
          visitTime: form.visitTime,
          guests: form.guests,
          specialRequests: form.specialRequests || undefined,
        }),
      });

      if (res.ok) {
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  function handleClose() {
    setState("form");
    setForm({ visitDate: "", visitTime: "", guests: 1, customerName: "", customerPhone: "", customerEmail: "", specialRequests: "" });
    onClose();
  }

  const timeSlots = Array.from({ length: 24 }, (_, h) => [`${String(h).padStart(2, "0")}:00`, `${String(h).padStart(2, "0")}:30`]).flat().filter((t) => t >= "09:00" && t <= "21:00");

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center" onClick={handleClose}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-lg animate-slide-up overflow-hidden rounded-t-2xl border border-amber-100/60 bg-white shadow-luxury-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-100/50 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4">
          <div>
            <h2 className="font-display text-xl font-bold text-busan-secondary">{t("title")}</h2>
            <p className="mt-0.5 text-sm text-amber-600">{businessName}</p>
          </div>
          <button onClick={handleClose} className="rounded-lg p-2 text-busan-secondary/40 transition-colors hover:bg-amber-100 hover:text-busan-secondary">
            <X size={20} />
          </button>
        </div>

        {/* Success State */}
        {state === "success" && (
          <div className="flex flex-col items-center px-6 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-busan-secondary">{t("success")}</h3>
            <p className="mt-2 text-sm text-busan-secondary/50">{t("successDesc")}</p>
            <button onClick={handleClose} className="btn-primary mt-6 text-sm">{t("done")}</button>
          </div>
        )}

        {/* Error State */}
        {state === "error" && (
          <div className="flex flex-col items-center px-6 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <XCircle size={32} className="text-red-500" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-busan-secondary">{t("error")}</h3>
            <p className="mt-2 text-sm text-busan-secondary/50">{t("errorDesc")}</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setState("form")} className="rounded-xl border border-amber-300 px-6 py-2.5 text-sm font-semibold text-amber-700 hover:bg-amber-50">
                {t("close")}
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        {(state === "form" || state === "submitting") && (
          <form onSubmit={handleSubmit} className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-5">
            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-busan-secondary/60">
                  <Calendar size={13} /> {t("date")}
                </span>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={form.visitDate}
                  onChange={(e) => update("visitDate", e.target.value)}
                  className="w-full rounded-xl border border-amber-200/60 bg-amber-50/30 px-4 py-2.5 text-sm text-busan-secondary outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-busan-secondary/60">
                  <Clock size={13} /> {t("time")}
                </span>
                <select
                  required
                  value={form.visitTime}
                  onChange={(e) => update("visitTime", e.target.value)}
                  className="w-full rounded-xl border border-amber-200/60 bg-amber-50/30 px-4 py-2.5 text-sm text-busan-secondary outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                >
                  <option value="">--:--</option>
                  {timeSlots.map((slot) => (<option key={slot} value={slot}>{slot}</option>))}
                </select>
              </label>
            </div>

            {/* Guests */}
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-busan-secondary/60">
                <Users size={13} /> {t("guests")}
              </span>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => update("guests", Math.max(1, form.guests - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200 text-lg font-bold text-amber-600 hover:bg-amber-50">−</button>
                <span className="w-12 text-center text-lg font-bold text-busan-secondary">{form.guests}</span>
                <button type="button" onClick={() => update("guests", Math.min(20, form.guests + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200 text-lg font-bold text-amber-600 hover:bg-amber-50">+</button>
                <span className="text-sm text-busan-secondary/40">{t("guestUnit")}</span>
              </div>
            </label>

            {/* Name & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-busan-secondary/60">
                  <User size={13} /> {t("name")}
                </span>
                <input
                  type="text" required
                  placeholder={t("namePlaceholder")}
                  value={form.customerName}
                  onChange={(e) => update("customerName", e.target.value)}
                  className="w-full rounded-xl border border-amber-200/60 bg-amber-50/30 px-4 py-2.5 text-sm text-busan-secondary outline-none transition-all placeholder:text-busan-secondary/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-busan-secondary/60">
                  <Phone size={13} /> {t("phone")}
                </span>
                <input
                  type="tel" required
                  placeholder={t("phonePlaceholder")}
                  value={form.customerPhone}
                  onChange={(e) => update("customerPhone", e.target.value)}
                  className="w-full rounded-xl border border-amber-200/60 bg-amber-50/30 px-4 py-2.5 text-sm text-busan-secondary outline-none transition-all placeholder:text-busan-secondary/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                />
              </label>
            </div>

            {/* Email */}
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-busan-secondary/60">
                <Mail size={13} /> {t("email")}
              </span>
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                value={form.customerEmail}
                onChange={(e) => update("customerEmail", e.target.value)}
                className="w-full rounded-xl border border-amber-200/60 bg-amber-50/30 px-4 py-2.5 text-sm text-busan-secondary outline-none transition-all placeholder:text-busan-secondary/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
              />
            </label>

            {/* Special Requests */}
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-busan-secondary/60">
                <MessageSquare size={13} /> {t("requests")}
              </span>
              <textarea
                rows={2}
                placeholder={t("requestsPlaceholder")}
                value={form.specialRequests}
                onChange={(e) => update("specialRequests", e.target.value)}
                className="w-full resize-none rounded-xl border border-amber-200/60 bg-amber-50/30 px-4 py-2.5 text-sm text-busan-secondary outline-none transition-all placeholder:text-busan-secondary/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
              />
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={state === "submitting"}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state === "submitting" ? t("submitting") : t("submit")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
