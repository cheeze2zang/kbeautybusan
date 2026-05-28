import { NextRequest, NextResponse } from "next/server";
import { createBooking, getBookings, initBookingsTable } from "@/lib/db";
import { sendBookingNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    await initBookingsTable();

    const body = await request.json();
    const { businessSlug, businessName, customerName, customerPhone, customerEmail, visitDate, visitTime, guests, specialRequests } = body;

    if (!businessSlug || !businessName || !customerName || !customerPhone || !visitDate || !visitTime || !guests) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const booking = await createBooking({
      businessSlug,
      businessName,
      customerName,
      customerPhone,
      customerEmail,
      visitDate,
      visitTime,
      guests: Number(guests),
      specialRequests,
    });

    sendBookingNotification({
      businessName,
      customerName,
      customerPhone,
      customerEmail,
      visitDate,
      visitTime,
      guests: Number(guests),
      specialRequests,
    }).catch(() => {});

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error("Booking creation failed:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await initBookingsTable();
    const bookings = await getBookings();
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
