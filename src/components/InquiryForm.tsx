"use client";
import { useState } from "react";
import type { Locale, Dictionary } from "@/lib/i18n";
import { track, type AnalyticsEvent, type BusinessUnit } from "@/lib/analytics";

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  required?: boolean;
  options?: { value: string; label: string }[];
}

export default function InquiryForm({
  formName, title, intro, fields, strings, showConfidential, analyticsEvent, businessUnit, analyticsParams,
}: {
  formName: string;
  locale: Locale;
  title: string;
  intro: string;
  fields: FieldDef[];
  strings: Dictionary["forms"];
  showConfidential?: boolean;
  analyticsEvent: AnalyticsEvent;
  businessUnit: BusinessUnit;
  analyticsParams?: Record<string, string>;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [bot, setBot] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  function set(name: string, v: string) {
    setValues((p) => ({ ...p, [name]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    setState("sending");
    const body = new URLSearchParams();
    body.append("form-name", formName);
    body.append("bot-field", bot);
    for (const f of fields) body.append(f.name, values[f.name] || "");
    body.append("consent", "yes");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error("bad status");
      setState("done");
      // Analytics carries no PII / message content — only category + unit.
      track(analyticsEvent, { ...(analyticsParams || {}), business_unit: businessUnit });
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <main className="formwrap">
        <div className="formok">
          <h2>{strings.successTitle}</h2>
          <p>{strings.successMsg}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="formwrap">
      <h1>{title}</h1>
      <p className="formintro">{intro}</p>
      {showConfidential ? <div className="warnbox">{strings.confidential}</div> : null}
      <form name={formName} onSubmit={onSubmit}>
        <p className="hp">
          <label>Do not fill this out<input name="bot-field" value={bot} onChange={(e) => setBot(e.target.value)} tabIndex={-1} autoComplete="off" /></label>
        </p>

        {fields.map((f) => (
          <div className="field" key={f.name}>
            <label htmlFor={f.name}>
              {f.label}
              {f.required ? <span className="req">{strings.requiredNote}</span> : null}
            </label>
            {f.type === "textarea" ? (
              <textarea id={f.name} name={f.name} required={f.required} value={values[f.name] || ""} onChange={(e) => set(f.name, e.target.value)} />
            ) : f.type === "select" ? (
              <select id={f.name} name={f.name} required={f.required} value={values[f.name] || ""} onChange={(e) => set(f.name, e.target.value)}>
                <option value="" disabled></option>
                {(f.options || []).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : (
              <input id={f.name} name={f.name} type={f.type} required={f.required} value={values[f.name] || ""} onChange={(e) => set(f.name, e.target.value)} />
            )}
          </div>
        ))}

        <label className="consent">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
          <span>{strings.consent}</span>
        </label>

        <button className="formbtn" type="submit" disabled={state === "sending" || !consent}>
          {state === "sending" ? strings.submitting : strings.submit}
        </button>
        {state === "error" ? <div className="formerr">{strings.errorMsg}</div> : null}
      </form>
    </main>
  );
}
