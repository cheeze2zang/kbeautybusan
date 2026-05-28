import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";

export async function DELETE() {
  try {
    await sql`DELETE FROM reviews`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset failed:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
