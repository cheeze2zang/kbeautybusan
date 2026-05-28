import { NextRequest, NextResponse } from "next/server";
import { deletePost } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deletePost(Number(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Post deletion failed:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
