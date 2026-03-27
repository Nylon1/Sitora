import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const requiredFields = [
      "fullName",
      "businessName",
      "email",
      "phone",
      "businessType",
      "hasWebsite",
      "goals",
    ] as const;

    for (const field of requiredFields) {
      if (!body[field] || typeof body[field] !== "string" || !body[field].trim()) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const payload = {
      full_name: body.fullName.trim(),
      business_name: body.businessName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      business_type: body.businessType.trim(),
      has_website: body.hasWebsite.trim(),
      goals: body.goals.trim(),
      source: "launchsite",
      submitted_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("leads").insert([payload]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message || "Database error" },
        { status: 500 }
      );
    }

    if (resend) {
      try {
        await resend.emails.send({
          from: "LaunchSite <onboarding@resend.dev>",
          to: ["hmaliks924@gmail.com"],
          subject: "New Lead - LaunchSite",
          html: `
            <h2>New Lead Submitted</h2>
            <p><strong>Name:</strong> ${payload.full_name}</p>
            <p><strong>Business:</strong> ${payload.business_name}</p>
            <p><strong>Email:</strong> ${payload.email}</p>
            <p><strong>Phone:</strong> ${payload.phone}</p>
            <p><strong>Type:</strong> ${payload.business_type}</p>
            <p><strong>Website:</strong> ${payload.has_website}</p>
            <p><strong>Goals:</strong> ${payload.goals}</p>
          `,
        });
      } catch (emailError) {
        console.error("Resend email error:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Apply route error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}