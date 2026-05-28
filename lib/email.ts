import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "");
}

export async function sendBookingNotification(data: {
  businessName: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  visitDate: string;
  visitTime: string;
  guests: number;
  specialRequests?: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || "hello@kbeautybusan.co.kr";

  if (!process.env.RESEND_API_KEY) {
    console.log("RESEND_API_KEY not set, skipping email notification");
    return { success: false, error: "No API key" };
  }

  try {
    const resend = getResend();
    await resend.emails.send({
      from: "KBeautyBusan <onboarding@resend.dev>",
      to: adminEmail,
      subject: `[New Booking] ${data.businessName} — ${data.customerName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #F59E0B, #D97706); padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">New Booking Received</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0;">KBeautyBusan Booking System</p>
          </div>
          <div style="background: #fff; padding: 24px; border: 1px solid #eee; border-top: 0; border-radius: 0 0 12px 12px;">
            <h2 style="color: #1E1B4B; margin-top: 0;">${data.businessName}</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #888; width: 120px;">Customer</td><td style="padding: 8px 0; font-weight: 600;">${data.customerName}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0;">${data.customerPhone}</td></tr>
              ${data.customerEmail ? `<tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;">${data.customerEmail}</td></tr>` : ""}
              <tr><td style="padding: 8px 0; color: #888;">Date</td><td style="padding: 8px 0; font-weight: 600;">${data.visitDate}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Time</td><td style="padding: 8px 0; font-weight: 600;">${data.visitTime}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Guests</td><td style="padding: 8px 0;">${data.guests}</td></tr>
              ${data.specialRequests ? `<tr><td style="padding: 8px 0; color: #888;">Requests</td><td style="padding: 8px 0;">${data.specialRequests}</td></tr>` : ""}
            </table>
            <div style="margin-top: 20px; padding: 12px; background: #FFFBF5; border-radius: 8px; border-left: 4px solid #D97706;">
              <p style="margin: 0; font-size: 14px; color: #92400E;">Please confirm or respond to this booking via the admin dashboard.</p>
            </div>
          </div>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error };
  }
}
