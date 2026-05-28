import { NextRequest, NextResponse } from "next/server";
import { createReview, getReviewsByBusiness, initReviewsTable } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await initReviewsTable();
    const slug = request.nextUrl.searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
    }
    const reviews = await getReviewsByBusiness(slug);
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await initReviewsTable();
    const body = await request.json();
    const { businessSlug, reviewerName, rating, comment, language } = body;

    if (!businessSlug || !reviewerName || !rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    const review = await createReview({
      businessSlug,
      reviewerName,
      rating: Number(rating),
      comment,
      language: language || "en",
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    console.error("Review creation failed:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
