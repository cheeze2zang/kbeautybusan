import { NextRequest, NextResponse } from "next/server";
import { incrementHelpful } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await incrementHelpful(Number(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Helpful increment failed:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
