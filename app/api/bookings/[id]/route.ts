import { NextRequest, NextResponse } from "next/server";
import { updateBookingStatus } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !["confirmed", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const booking = await updateBookingStatus(Number(id), status);
    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Status update failed:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
