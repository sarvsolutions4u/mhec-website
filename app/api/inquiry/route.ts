import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type Inquiry = {
  name: string;
  phone: string;
  email: string;
  qualification: string;
  course: string;
  message?: string;
  page?: string;
  channel?: "email" | "whatsapp";
  website?: string; // spam trap
};

const clean = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: Request) {
  let body: Inquiry;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success so they move on
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const data = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    qualification: clean(body.qualification, 120),
    course: clean(body.course, 160),
    message: clean(body.message, 2000),
    page: clean(body.page, 200),
    channel: body.channel === "whatsapp" ? "whatsapp" : "email",
  };

  const digits = data.phone.replace(/\D/g, "");
  if (
    data.name.length < 2 ||
    digits.length < 7 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email) ||
    !data.qualification ||
    !data.course
  ) {
    return NextResponse.json({ ok: false, error: "Please complete all required fields." }, { status: 422 });
  }

  let emailed = false;
  let stored = false;

  // 1) Email the inquiry to the admissions inbox (Resend)
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const to = process.env.INQUIRY_TO_EMAIL || site.contact.email;
      const from = process.env.INQUIRY_FROM_EMAIL || `MHEC Website <onboarding@resend.dev>`;
      const rows: [string, string][] = [
        ["Name", data.name],
        ["Phone / WhatsApp", data.phone],
        ["Email", data.email],
        ["Qualification", data.qualification],
        ["Course of interest", data.course],
        ["Message", data.message || "—"],
        ["Sent from page", data.page || "—"],
        ["Preferred channel", data.channel === "whatsapp" ? "WhatsApp (also opened a chat)" : "Email form"],
      ];
      const wa = `https://wa.me/${digits}`;
      const html = `
        <div style="font-family:Arial,sans-serif;color:#231F20;max-width:560px">
          <h2 style="margin:0 0 12px">New website inquiry: ${escapeHtml(data.course)}</h2>
          <table style="border-collapse:collapse;width:100%">
            ${rows
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:8px;border-bottom:1px solid #DCE6EE;color:#5C5658;width:170px">${k}</td><td style="padding:8px;border-bottom:1px solid #DCE6EE">${escapeHtml(v)}</td></tr>`
              )
              .join("")}
          </table>
          <p style="margin-top:16px">
            <a href="${wa}" style="background:#50ACE4;color:#231F20;padding:10px 16px;border-radius:999px;text-decoration:none;font-weight:bold">Reply on WhatsApp</a>
            &nbsp; <a href="mailto:${escapeHtml(data.email)}">Reply by email</a>
          </p>
        </div>`;
      const { error } = await resend.emails.send({
        from,
        to: [to],
        replyTo: data.email,
        subject: `Website inquiry — ${data.course} — ${data.name}`,
        html,
        text: rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nWhatsApp: ${wa}`,
      });
      emailed = !error;
      if (error) console.error("Resend error", error);
    } catch (e) {
      console.error("Email failed", e);
    }
  }

  // 2) Optional: keep a log of every inquiry in Supabase
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      });
      const { error } = await supabase.from("inquiries").insert(data);
      stored = !error;
      if (error) console.error("Supabase error", error);
    } catch (e) {
      console.error("Storage failed", e);
    }
  }

  // WhatsApp inquiries are delivered by the visitor's own WhatsApp, so they succeed even without email set up
  const ok = emailed || stored || data.channel === "whatsapp";
  if (!ok) console.warn("Inquiry received but no delivery channel is configured. Set RESEND_API_KEY.", data);

  return NextResponse.json({ ok, emailed, stored }, { status: ok ? 200 : 503 });
}
