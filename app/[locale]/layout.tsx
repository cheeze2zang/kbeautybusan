import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "@/app/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingChat from "@/components/ui/FloatingChat";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Busan Head Spa & Massage Booking | KBeautyBusan",
  description:
    "Book premium K-Beauty services in Busan — Massage, Head Spa, Skincare, Medical Beauty and more. Video-verified venues.",
  keywords: [
    "Busan K-Beauty",
    "Busan massage",
    "Busan head spa",
    "부산 마사지",
    "부산 헤드스파",
    "부산 피부관리",
    "Haeundae beauty",
    "Seomyeon spa",
  ],
  openGraph: {
    title: "KBeautyBusan — Premium K-Beauty Booking",
    description: "Video-Verified Premium K-Beauty Booking Platform in Busan",
    url: "https://www.kbeautybusan.co.kr",
    siteName: "KBeautyBusan",
    locale: "ko_KR",
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="font-body bg-busan-bg min-h-screen antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingChat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
