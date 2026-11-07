"use client";

import { useId, useState } from "react";
import { CircleAlert, Mail } from "lucide-react";
import { Reveal } from "./reveal";
import { usePortfolioLang } from "./lang-context";

type FormState = { name: string; email: string; subject: string; message: string };
// The form does not send anything itself: it opens the visitor's mail app with the
// message prefilled. "opened" therefore never claims the message was delivered.
type Status = "idle" | "opened";

const emptyForm: FormState = { name: "", email: "", subject: "", message: "" };

function Field({
  type,
  name,
  autoComplete,
  label,
  value,
  onChange,
  multiline,
}: {
  type?: string;
  name: string;
  autoComplete?: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const id = useId();
  if (multiline) {
    return (
      <div className="pf-fld">
        <textarea id={id} name={name} rows={4} placeholder=" " value={value} onChange={(e) => onChange(e.target.value)} />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  }
  return (
    <div className="pf-fld">
      <input
        id={id}
        name={name}
        type={type ?? "text"}
        autoComplete={autoComplete}
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export function ContactForm() {
  const { t, contactEmail } = usePortfolioLang();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState(false);

  const updateField = (key: keyof FormState) => (value: string) => {
    setForm((s) => ({ ...s, [key]: value }));
    setErr(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErr(true);
      return;
    }
    const subject = form.subject.trim() || `Portfolio contact — ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("opened");
  };

  return (
    <Reveal
      delay={0.15}
      className="relative overflow-hidden rounded-3xl border border-white/[0.09] p-[34px] shadow-[0_40px_90px_rgba(0,0,0,.45)]"
      style={{ background: "linear-gradient(165deg,rgba(28,26,38,.9),rgba(16,16,22,.9))" }}
    >
      <div
        className="pointer-events-none absolute -right-[20%] -top-[40%] h-[80%] w-[70%]"
        style={{ background: "radial-gradient(circle,rgba(181,124,255,.16),transparent 65%)" }}
      />

      {status === "idle" && (
        <form onSubmit={submit} className="relative z-[1] flex flex-col gap-[14px]">
          <h3 className="m-0 mb-1 font-space text-[22px] font-semibold tracking-[-0.01em]">{t.formTitle}</h3>
          <Field name="name" autoComplete="name" label={t.fName} value={form.name} onChange={updateField("name")} />
          <Field type="email" name="email" autoComplete="email" label={t.fEmail} value={form.email} onChange={updateField("email")} />
          <Field name="subject" label={t.fSubject} value={form.subject} onChange={updateField("subject")} />
          <Field name="message" label={t.fMsg} value={form.message} onChange={updateField("message")} multiline />
          {err && (
            <div className="flex items-center gap-[7px] text-[13.5px] text-[#ff9b8a]">
              <CircleAlert size={15} />
              {t.fErr}
            </div>
          )}
          <button
            type="submit"
            className="pf-sendbtn mt-1 inline-flex items-center justify-center gap-[9px] rounded-2xl border-none px-6 py-[15px] font-space text-base font-semibold text-white"
            style={{ background: "linear-gradient(100deg,#b57cff,#7c5cff)" }}
          >
            <Mail size={18} strokeWidth={2.4} />
            {t.fSend}
          </button>
        </form>
      )}

      {status === "opened" && (
        <div role="status" className="pf-success-pop relative z-[1] px-[6px] pb-3 pt-[26px] text-center">
          <span
            className="mx-auto mb-5 flex h-[78px] w-[78px] items-center justify-center rounded-full"
            style={{ background: "linear-gradient(120deg,#4fd6c6,#b57cff)" }}
          >
            <Mail size={34} color="#0c0c11" strokeWidth={2.4} />
          </span>
          <h3 className="m-0 mb-2 font-space text-2xl font-bold tracking-[-0.02em]">{t.fSent}</h3>
          <p className="mx-auto mb-[22px] max-w-[320px] text-[14.5px] leading-[1.55] text-[#9a98a6]">
            {t.fSentSub}{" "}
            <a href={`mailto:${contactEmail}`} className="text-[#d6d4de] underline">
              {contactEmail}
            </a>
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="pf-arrowbtn inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-5 py-[11px] font-sans text-[14.5px] font-semibold text-[#f2f0f7]"
          >
            {t.fAgain}
          </button>
        </div>
      )}
    </Reveal>
  );
}
