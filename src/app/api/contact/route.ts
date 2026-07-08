import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "davibunn@gmail.com";
// Resend requires a verified sender. Their onboarding domain works for testing.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// Simple in-memory rate limit. Per-instance only (resets on cold start) — fine
// for a low-traffic solo site; swap for a durable store (Upstash) if needed.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a little while." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden field. Pretend success without sending.
  if (typeof body.company_url === "string" && body.company_url.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const interest = String(body.interest ?? "Not sure yet").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and message." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { error: "That message is a bit long — please shorten it." },
      { status: 400 }
    );
  }

  const subject = `New North Alpha inquiry — ${interest} — ${name}`;
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    `Interested in: ${interest}`,
    "",
    message,
  ].filter(Boolean) as string[];

  // If Resend isn't configured yet, log server-side and still succeed so the
  // form is fully testable before keys are added.
  if (!RESEND_API_KEY) {
    console.info("[contact] (Resend not configured) submission:\n", lines.join("\n"));
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: `North Alpha <${FROM_EMAIL}>`,
      to: [OWNER_EMAIL],
      replyTo: email,
      subject,
      text: lines.join("\n"),
      html: `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6">
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
        <p><strong>Interested in:</strong> ${escapeHtml(interest)}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please email me directly." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please email me directly." },
      { status: 500 }
    );
  }
}
