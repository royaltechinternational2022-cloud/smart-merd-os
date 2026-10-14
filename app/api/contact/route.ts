import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const consent = body.consent === true;
  const website = typeof body.website === "string" ? body.website : "";
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;

  // Honeypot: bots tend to fill every field.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  // Basic timing check: real users take at least a couple of seconds.
  if (startedAt && Date.now() - startedAt < 1500) {
    return NextResponse.json({ ok: false, error: "too_fast" }, { status: 400 });
  }

  const errors: Record<string, string> = {};
  if (!name) errors.name = "required";
  if (!company) errors.company = "required";
  if (!email || !EMAIL_RE.test(email)) errors.email = "email";
  if (!consent) errors.consent = "consent";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // No email/CRM integration is configured yet — the request is accepted and
  // logged server-side. Wire this up to a provider (e.g. Resend, HubSpot) when available.
  console.log("[smart-merd-os] contact request", {
    name,
    company,
    email,
    topic: body.topic,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
