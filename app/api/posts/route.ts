import { NextRequest, NextResponse } from "next/server";
import { createPost, getPosts, initPostsTable } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await initPostsTable();
    const posts = await getPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await initPostsTable();
    const body = await request.json();
    const { title, content, category, businessSlug, businessName, imageUrl } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const post = await createPost({
      title,
      content,
      category: category || "news",
      businessSlug,
      businessName,
      imageUrl,
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error("Post creation failed:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
