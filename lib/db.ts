import { sql } from "@vercel/postgres";

export async function initBookingsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      business_slug VARCHAR(255) NOT NULL,
      business_name VARCHAR(255) NOT NULL,
      customer_name VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(50) NOT NULL,
      customer_email VARCHAR(255),
      visit_date DATE NOT NULL,
      visit_time VARCHAR(10) NOT NULL,
      guests INTEGER NOT NULL DEFAULT 1,
      special_requests TEXT,
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
}

export interface Booking {
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

export async function createBooking(data: {
  businessSlug: string;
  businessName: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  visitDate: string;
  visitTime: string;
  guests: number;
  specialRequests?: string;
}): Promise<Booking> {
  const result = await sql`
    INSERT INTO bookings (business_slug, business_name, customer_name, customer_phone, customer_email, visit_date, visit_time, guests, special_requests)
    VALUES (${data.businessSlug}, ${data.businessName}, ${data.customerName}, ${data.customerPhone}, ${data.customerEmail || null}, ${data.visitDate}, ${data.visitTime}, ${data.guests}, ${data.specialRequests || null})
    RETURNING *
  `;
  return result.rows[0] as Booking;
}

export async function getBookings(limit = 50): Promise<Booking[]> {
  const result = await sql`
    SELECT * FROM bookings ORDER BY created_at DESC LIMIT ${limit}
  `;
  return result.rows as Booking[];
}

export async function updateBookingStatus(id: number, status: "confirmed" | "cancelled"): Promise<Booking> {
  const result = await sql`
    UPDATE bookings SET status = ${status} WHERE id = ${id} RETURNING *
  `;
  return result.rows[0] as Booking;
}

export async function getBookingStats() {
  const result = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE status = 'pending') as pending,
      COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed,
      COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled
    FROM bookings
  `;
  return result.rows[0] as { total: string; pending: string; confirmed: string; cancelled: string };
}
