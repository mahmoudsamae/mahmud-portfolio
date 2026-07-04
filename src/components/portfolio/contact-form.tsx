"use client";

import { useState } from "react";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { ArrowLink } from "./arrow-link";
import { Reveal } from "./reveal";
import { usePortfolioLang } from "./lang-context";

type FormState = { name: string; email: string; subject: string; message: string };
type Status = "idle" | "sending" | "sent";

const emptyForm: FormState = { name: "", email: "", subject: "", message: "" };

function Field({
  type,
  label,
  value,
  onChange,
  multiline,
}: {
  type?: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  if (multiline) {
    return (
      <div className="pf-fld">
        <textarea rows={4} placeholder=" " value={value} onChange={(e) => onChange(e.target.value)} />
        <label>{label}</label>
      </div>
    );
  }
  return (
    <div className="pf-fld">
      <input type={type ?? "text"} placeholder=" " value={value} onChange={(e) => onChange(e.target.value)} />
      <label>{label}</label>
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
    setStatus("sending");
    const subject = form.subject.trim() || `Portfolio contact — ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    const href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setTimeout(() => {
      window.location.href = href;
      setStatus("sent");
    }, 900);
  };

  const reset = () => {
    setForm(emptyForm);
    setStatus("idle");
    setErr(false);
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

      {status !== "sent" && (
        <form onSubmit={submit} className="relative z-[1] flex flex-col gap-[14px]">
          <h3 className="m-0 mb-1 font-space text-[22px] font-semibold tracking-[-0.01em]">{t.formTitle}</h3>
          <Field label={t.fName} value={form.name} onChange={updateField("name")} />
          <Field type="email" label={t.fEmail} value={form.email} onChange={updateField("email")} />
          <Field label={t.fSubject} value={form.subject} onChange={updateField("subject")} />
          <Field label={t.fMsg} value={form.message} onChange={updateField("message")} multiline />
          {err && (
            <div className="flex items-center gap-[7px] text-[13.5px] text-[#ff9b8a]">
              <CircleAlert size={15} />
              {t.fErr}
            </div>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="pf-sendbtn mt-1 inline-flex items-center justify-center gap-[9px] rounded-2xl border-none px-6 py-[15px] font-space text-base font-semibold text-white"
            style={{ background: "linear-gradient(100deg,#b57cff,#7c5cff)" }}
          >
            {status === "sending" && <LoaderCircle size={18} strokeWidth={2.4} className="pf-spin" />}
            {status === "sending" ? t.fSending : t.fSend}
          </button>
        </form>
      )}

      {status === "sent" && (
        <div className="pf-success-pop relative z-[1] px-[6px] pb-3 pt-[26px] text-center">
          <div className="relative mx-auto mb-5 h-[78px] w-[78px]">
            <span className="pf-ring-pulse absolute inset-0 rounded-full border-2 border-[rgba(79,214,198,.6)]" />
            <span
              className="absolute inset-0 flex items-center justify-center rounded-full"
              style={{ background: "linear-gradient(120deg,#4fd6c6,#b57cff)" }}
            >
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#0c0c11" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" className="pf-check-draw" />
              </svg>
            </span>
          </div>
          <h3 className="m-0 mb-2 font-space text-2xl font-bold tracking-[-0.02em]">{t.fSent}</h3>
          <p className="mx-auto mb-[22px] max-w-[320px] text-[14.5px] leading-[1.55] text-[#9a98a6]">{t.fSentSub}</p>
          <ArrowLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              reset();
            }}
            className="border border-white/[0.14] bg-white/[0.04] px-5 py-[11px] text-[14.5px] text-[#f2f0f7]"
          >
            {t.fAgain}
          </ArrowLink>
        </div>
      )}
    </Reveal>
  );
}
