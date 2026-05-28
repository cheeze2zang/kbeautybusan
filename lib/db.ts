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

// ── Reviews ──

export async function initReviewsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      business_slug VARCHAR(255) NOT NULL,
      reviewer_name VARCHAR(255) NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      language VARCHAR(5) NOT NULL DEFAULT 'en',
      helpful_count INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
}

export interface Review {
  id: number;
  business_slug: string;
  reviewer_name: string;
  rating: number;
  comment: string | null;
  language: string;
  helpful_count: number;
  created_at: string;
}

export async function createReview(data: {
  businessSlug: string;
  reviewerName: string;
  rating: number;
  comment?: string;
  language: string;
}): Promise<Review> {
  const result = await sql`
    INSERT INTO reviews (business_slug, reviewer_name, rating, comment, language)
    VALUES (${data.businessSlug}, ${data.reviewerName}, ${data.rating}, ${data.comment || null}, ${data.language})
    RETURNING *
  `;
  return result.rows[0] as Review;
}

export async function getReviewsByBusiness(slug: string): Promise<Review[]> {
  const result = await sql`
    SELECT * FROM reviews WHERE business_slug = ${slug} ORDER BY created_at DESC
  `;
  return result.rows as Review[];
}

export async function getReviewStats(slug: string) {
  const result = await sql`
    SELECT
      COUNT(*) as total,
      COALESCE(AVG(rating), 0) as average
    FROM reviews WHERE business_slug = ${slug}
  `;
  return result.rows[0] as { total: string; average: string };
}

export async function incrementHelpful(id: number) {
  await sql`UPDATE reviews SET helpful_count = helpful_count + 1 WHERE id = ${id}`;
}

// ── Posts (News & Events) ──

export async function initPostsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      category VARCHAR(20) NOT NULL DEFAULT 'news',
      business_slug VARCHAR(255),
      business_name VARCHAR(255),
      image_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  category: "news" | "event" | "promotion";
  business_slug: string | null;
  business_name: string | null;
  image_url: string | null;
  created_at: string;
}

export async function createPost(data: {
  title: string;
  content: string;
  category: string;
  businessSlug?: string;
  businessName?: string;
  imageUrl?: string;
}): Promise<Post> {
  const result = await sql`
    INSERT INTO posts (title, content, category, business_slug, business_name, image_url)
    VALUES (${data.title}, ${data.content}, ${data.category}, ${data.businessSlug || null}, ${data.businessName || null}, ${data.imageUrl || null})
    RETURNING *
  `;
  return result.rows[0] as Post;
}

export async function getPosts(): Promise<Post[]> {
  const result = await sql`SELECT * FROM posts ORDER BY created_at DESC`;
  return result.rows as Post[];
}

export async function getPostById(id: number): Promise<Post | undefined> {
  const result = await sql`SELECT * FROM posts WHERE id = ${id}`;
  return result.rows[0] as Post | undefined;
}

export async function deletePost(id: number) {
  await sql`DELETE FROM posts WHERE id = ${id}`;
}
