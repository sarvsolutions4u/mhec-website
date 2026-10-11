"use client";

import { useId, useState } from "react";
import { usePathname } from "next/navigation";
import { qualificationOptions, courseOptionsFor, type SectionKey } from "@/lib/programs";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppFloat";

type Fields = {
  name: string;
  phone: string;
  email: string;
  qualification: string;
  course: string;
  message: string;
};
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", phone: "", email: "", qualification: "", course: "", message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Enter your full name.";
  const digits = f.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) e.phone = "Enter a phone number with country code, for example +968 9123 4567.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Enter an email address like name@example.com.";
  if (!f.qualification) e.qualification = "Choose your highest qualification.";
  if (!f.course) e.course = "Choose the programme you are interested in.";
  return e;
}

function whatsappMessage(f: Fields) {
  return [
    "Hello MHEC, I would like to inquire about a programme.",
    "",
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    `Email: ${f.email}`,
    `Qualification: ${f.qualification}`,
    `Interested in: ${f.course}`,
    f.message ? `Message: ${f.message}` : "",
  ]
    .filter((l, i, arr) => !(l === "" && i === arr.length - 1))
    .join("\n");
}

export default function InquiryForm({
  section,
  defaultCourse,
  title = "Ask an advisor",
  intro = "Tell us a little about yourself. An advisor will reply by phone, WhatsApp or email, usually within one working day.",
  tone = "light",
}: {
  section?: SectionKey;
  defaultCourse?: string;
  title?: string;
  intro?: string;
  tone?: "light" | "dark";
}) {
  const uid = useId();
  const pathname = usePathname();
  const [f, setF] = useState<Fields>({ ...empty, course: defaultCourse || "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [hp, setHp] = useState("");
  const groups = courseOptionsFor(section);
  const dark = tone === "dark";

  const set = (k: keyof Fields) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setF((p) => ({ ...p, [k]: ev.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  async function post(channel: "email" | "whatsapp") {
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...f, channel, page: pathname, website: hp }),
    });
    return res.ok;
  }

  function check() {
    const e = validate(f);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return false;
    }
    return true;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!check()) return;
    setStatus("sending");
    try {
      const ok = await post("email");
      setStatus(ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  function onWhatsApp() {
    if (!check()) return;
    // Log the inquiry in the background, then open WhatsApp with the details filled in
    post("whatsapp").catch(() => {});
    window.open(whatsappLink(whatsappMessage(f)), "_blank", "noopener");
    setStatus("sent");
  }

  const label = `block text-sm font-semibold mb-1.5 ${dark ? "text-white" : "text-ink"}`;
  const errCls = `mt-1.5 text-sm ${dark ? "text-[#ffb4ab]" : "text-[#b42318]"}`;

  if (status === "sent") {
    return (
      <div className={`rounded-panel p-8 ${dark ? "bg-white/5 text-white" : "bg-white border border-line"}`} role="status">
        <h3 className="text-h3">Thank you, {f.name.split(" ")[0]}. Your inquiry is with us.</h3>
        <p className={`mt-3 ${dark ? "text-white/75" : "text-stone"}`}>
          An advisor will contact you on {f.phone} about {f.course}. If you would like a faster reply, message us on WhatsApp now.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={whatsappLink(whatsappMessage(f))} target="_blank" rel="noopener" className="btn btn-primary">
            <WhatsAppIcon /> Continue on WhatsApp
          </a>
          <button type="button" className={`btn btn-outline ${dark ? "text-white" : ""}`} onClick={() => { setF({ ...empty }); setStatus("idle"); }}>
            Send another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`rounded-panel p-6 sm:p-8 ${dark ? "bg-white/5 ring-1 ring-white/15" : "bg-white border border-line shadow-[0_20px_50px_-30px_rgba(27,111,166,0.45)]"}`}
      aria-labelledby={`${uid}-title`}
    >
      <h3 id={`${uid}-title`} className={`text-h3 ${dark ? "text-white" : ""}`}>{title}</h3>
      <p className={`mt-2 text-[0.975rem] ${dark ? "text-white/70" : "text-stone"}`}>{intro}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-name`} className={label}>Full name</label>
          <input id={`${uid}-name`} className="field" autoComplete="name" value={f.name} onChange={set("name")}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} />
          {errors.name && <p id={`${uid}-name-err`} className={errCls}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className={label}>Phone / WhatsApp</label>
          <input id={`${uid}-phone`} className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="+968"
            value={f.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${uid}-phone-err` : undefined} />
          {errors.phone && <p id={`${uid}-phone-err`} className={errCls}>{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={label}>Email</label>
          <input id={`${uid}-email`} className="field" type="email" autoComplete="email" value={f.email} onChange={set("email")}
            aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}-email-err` : undefined} />
          {errors.email && <p id={`${uid}-email-err`} className={errCls}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-qualification`} className={label}>Highest qualification</label>
          <select id={`${uid}-qualification`} className="field" value={f.qualification} onChange={set("qualification")}
            aria-invalid={!!errors.qualification} aria-describedby={errors.qualification ? `${uid}-qualification-err` : undefined}>
            <option value="">Select</option>
            {qualificationOptions.map((q) => <option key={q}>{q}</option>)}
          </select>
          {errors.qualification && <p id={`${uid}-qualification-err`} className={errCls}>{errors.qualification}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-course`} className={label}>Course of interest</label>
          <select id={`${uid}-course`} className="field" value={f.course} onChange={set("course")}
            aria-invalid={!!errors.course} aria-describedby={errors.course ? `${uid}-course-err` : undefined}>
            <option value="">Select</option>
            {groups.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.options.map((o) => <option key={`${g.label}-${o}`} value={o}>{o}</option>)}
              </optgroup>
            ))}
            <option value="Not sure yet — please advise">Not sure yet — please advise</option>
          </select>
          {errors.course && <p id={`${uid}-course-err`} className={errCls}>{errors.course}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-message`} className={label}>
            Message <span className={`font-normal ${dark ? "text-white/60" : "text-stone"}`}>(optional)</span>
          </label>
          <textarea id={`${uid}-message`} className="field min-h-24" rows={3} value={f.message} onChange={set("message")} />
        </div>
        {/* Spam trap: hidden from people, filled by bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor={`${uid}-website`}>Website</label>
          <input id={`${uid}-website`} tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </div>
      </div>

      {status === "failed" && (
        <p className={`mt-5 rounded-xl p-4 text-sm ${dark ? "bg-white/10 text-white" : "bg-[#fef3f2] text-[#912018]"}`} role="alert">
          The inquiry could not be sent by email. Send it on WhatsApp instead, or call us — your details are still filled in.
        </p>
      )}

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button type="submit" className="btn btn-primary flex-1" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send inquiry"}
        </button>
        <button type="button" onClick={onWhatsApp} className={`btn flex-1 ${dark ? "bg-white text-ink hover:bg-white/90" : "btn-dark"}`}>
          <WhatsAppIcon /> Send on WhatsApp
        </button>
      </div>
      <p className={`mt-4 text-xs ${dark ? "text-white/55" : "text-stone"}`}>
        We use your details only to respond to your inquiry. See our <a href="/privacy" className="underline">privacy notice</a>.
      </p>
    </form>
  );
}
