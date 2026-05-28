"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { RefreshCw, Bell, CheckCircle2, XCircle, Clock, Users, Calendar, CalendarCheck, Megaphone } from "lucide-react";
import PostManager from "./PostManager";

interface Booking {
  id: number;
  business_slug: string;
  business_name: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  visit_date: string;
  visit_time: string;
  guests: number;
  special_requests: string | null;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}

export default function Dashboard() {
  const t = useTranslations("admin");
  const [tab, setTab] = useState<"bookings" | "posts">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [prevCount, setPrevCount] = useState(0);
  const [newAlert, setNewAlert] = useState(false);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.bookings) {
        if (prevCount > 0 && data.bookings.length > prevCount) {
          setNewAlert(true);
          if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
            new Notification("KBeautyBusan", { body: t("newAlert") });
          }
          setTimeout(() => setNewAlert(false), 5000);
        }
        setPrevCount(data.bookings.length);
        setBookings(data.bookings);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [prevCount, t]);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    fetchBookings();
    const interval = setInterval(fetchBookings, 10000);
    return () => clearInterval(interval);
  }, [fetchBookings]);

  async function updateStatus(id: number, status: "confirmed" | "cancelled") {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchBookings();
  }

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const statusColor: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-busan-bg pt-28 pb-16">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-busan-secondary sm:text-4xl">{t("title")}</h1>
            <p className="mt-1 text-sm text-busan-secondary/50">{t("subtitle")}</p>
          </div>
          <div className="flex items-center gap-3">
            {newAlert && (
              <div className="flex animate-fade-in items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                <Bell size={14} className="animate-bounce" />
                {t("newAlert")}
              </div>
            )}
            {tab === "bookings" && (
              <button
                onClick={fetchBookings}
                className="flex items-center gap-2 rounded-xl border border-amber-200 px-4 py-2.5 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-50"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                {t("refresh")}
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-2 border-b border-amber-100">
          <button
            onClick={() => setTab("bookings")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              tab === "bookings" ? "border-amber-500 text-busan-secondary" : "border-transparent text-busan-secondary/40 hover:text-busan-secondary/70"
            }`}
          >
            <CalendarCheck size={16} /> {t("tabBookings")}
          </button>
          <button
            onClick={() => setTab("posts")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              tab === "posts" ? "border-amber-500 text-busan-secondary" : "border-transparent text-busan-secondary/40 hover:text-busan-secondary/70"
            }`}
          >
            <Megaphone size={16} /> {t("tabPosts")}
          </button>
        </div>

        {tab === "posts" && (
          <div className="mt-8">
            <PostManager />
          </div>
        )}

        {tab === "bookings" && (
        <>
        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-amber-100/60 bg-white/90 p-5 shadow-luxury">
            <div className="text-xs font-semibold text-busan-secondary/40">{t("total")}</div>
            <div className="mt-2 font-display text-3xl font-bold text-busan-secondary">{stats.total}</div>
          </div>
          <div className="rounded-2xl border border-amber-100/60 bg-white/90 p-5 shadow-luxury">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600">
              <Clock size={12} /> {t("pending")}
            </div>
            <div className="mt-2 font-display text-3xl font-bold text-amber-600">{stats.pending}</div>
          </div>
          <div className="rounded-2xl border border-amber-100/60 bg-white/90 p-5 shadow-luxury">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
              <CheckCircle2 size={12} /> {t("confirmed")}
            </div>
            <div className="mt-2 font-display text-3xl font-bold text-green-600">{stats.confirmed}</div>
          </div>
          <div className="rounded-2xl border border-amber-100/60 bg-white/90 p-5 shadow-luxury">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-red-500">
              <XCircle size={12} /> {t("cancelled")}
            </div>
            <div className="mt-2 font-display text-3xl font-bold text-red-500">{stats.cancelled}</div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-amber-100/60 bg-white/90 shadow-luxury-lg">
          <div className="border-b border-amber-100/50 px-6 py-4">
            <h2 className="font-display text-xl font-bold text-busan-secondary">{t("recent")}</h2>
          </div>

          {bookings.length === 0 ? (
            <div className="px-6 py-16 text-center text-busan-secondary/40">
              <Calendar size={40} className="mx-auto mb-3 text-amber-300" />
              <p>{t("noBkgs")}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-sm">
                <thead>
                  <tr className="border-b border-amber-100/50 bg-amber-50/30 text-left text-xs font-semibold uppercase tracking-wider text-busan-secondary/40">
                    <th className="px-6 py-3">{t("business")}</th>
                    <th className="px-4 py-3">{t("customer")}</th>
                    <th className="px-4 py-3">{t("dateTime")}</th>
                    <th className="px-4 py-3">{t("guestsLabel")}</th>
                    <th className="px-4 py-3">{t("status")}</th>
                    <th className="px-4 py-3">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((bk) => (
                    <tr key={bk.id} className="border-b border-amber-50 transition-colors hover:bg-amber-50/30">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-busan-secondary">{bk.business_name}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-busan-secondary">{bk.customer_name}</div>
                        <div className="text-xs text-busan-secondary/40">{bk.customer_phone}</div>
                        {bk.customer_email && <div className="text-xs text-busan-secondary/30">{bk.customer_email}</div>}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-busan-secondary">{new Date(bk.visit_date).toLocaleDateString()}</div>
                        <div className="text-xs text-amber-600">{bk.visit_time}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1 text-busan-secondary">
                          <Users size={14} /> {bk.guests}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColor[bk.status]}`}>
                          {t(bk.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {bk.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateStatus(bk.id, "confirmed")}
                              className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700 transition-colors hover:bg-green-200"
                            >
                              {t("confirm")}
                            </button>
                            <button
                              onClick={() => updateStatus(bk.id, "cancelled")}
                              className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-200"
                            >
                              {t("cancel")}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        </>
        )}
      </div>
    </div>
  );
}
