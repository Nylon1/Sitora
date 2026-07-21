import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();

    if (!validEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
    }

    const payload = {
      email,
      source: "qr-code-generator",
      qr_type: String(body.qrType || "website").slice(0, 40),
      destination: String(body.destination || "").slice(0, 2000),
      marketing_consent: Boolean(body.marketingConsent),
      design: body.design || {},
      submitted_at: new Date().toISOString(),
    };

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (url && key) {
      const supabase = createClient(url, key);
      const { error } = await supabase.from("leads").insert([
        {
          email: payload.email,
          source: payload.source,
          goals: `QR ${payload.qr_type}: ${payload.destination}`,
          submitted_at: payload.submitted_at,
        },
      ]);
      if (error) console.error("QR lead Supabase error:", error);
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Sitora <onboarding@resend.dev>",
        to: [email],
        subject: "Your custom QR code is ready",
        html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px"><h1>Your QR code is ready</h1><p>Thanks for using Sitora's free QR Studio.</p><p>Your download will begin in your browser. Keep this email as confirmation that your design was created.</p><p style="margin-top:28px;color:#64748b">Sitora — digital experiences that bring customers.</p></div>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("QR lead route error:", error);
    return NextResponse.json({ error: "Unable to process your request" }, { status: 500 });
  }
}
