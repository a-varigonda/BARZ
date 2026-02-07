// backend/src/utils/emailService.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, username: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set. Skipping email send.");
    return;
  }

  try {
    await resend.emails.send({
      from: "BARZ <no-reply@yourdomain.com>", // use a verified sender
      to: email,
      subject: "Welcome to BARZ",
      html: `<p>Hi ${username}, your account has been created.</p>`,
    });
    console.log(`Welcome email sent to ${email}`);
  } catch (err) {
    console.error("Error sending welcome email with Resend:", err);
  }
}

  