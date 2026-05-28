import { notFound } from "next/navigation";
import { businesses, getBusinessBySlug } from "@/data/businesses";
import { routing } from "@/i18n/routing";
import BusinessDetail from "@/components/business/BusinessDetail";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    businesses.map((b) => ({ locale, slug: b.slug }))
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const biz = getBusinessBySlug(slug);
  if (!biz) return { title: "Not Found | KBeautyBusan" };

  return {
    title: `${biz.name} | KBeautyBusan`,
    description: biz.description,
  };
}

export default async function BusinessPage({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  return <BusinessDetail business={business} />;
}
