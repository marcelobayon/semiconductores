"use client";
import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { track } from "@/lib/analytics";

export default function CourseWaitlist({ course, e }: { course: string; e: Dictionary["education"] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bot, setBot] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!consent) return;
    setState("sending");
    const body = new URLSearchParams();
    body.append("form-name", "course-waitlist");
    body.append("bot-field", bot);
    body.append("course", course);
    body.append("name", name);
    body.append("email", email);
    body.append("consent", "yes");
    try {
      const r = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
      if (!r.ok) throw new Error();
      setState("done");
      track("course_waitlist_submitted", { course, business_unit: "education" });
    } catch {
      setState("error");
    }
  }

  if (state === "done") return <div className="formok"><h2>{e.waitlistTitle}</h2><p>{e.waitlistOk}</p></div>;

  return (
    <form name="course-waitlist" onSubmit={submit} className="waitform">
      <h3 className="sec">{e.waitlistTitle}</h3>
      <p className="hp"><label>Do not fill<input name="bot-field" value={bot} onChange={(x) => setBot(x.target.value)} tabIndex={-1} autoComplete="off" /></label></p>
      <div className="field"><label htmlFor="cw-name">{e.name}</label><input id="cw-name" value={name} onChange={(x) => setName(x.target.value)} required /></div>
      <div className="field"><label htmlFor="cw-email">{e.email}</label><input id="cw-email" type="email" value={email} onChange={(x) => setEmail(x.target.value)} required /></div>
      <label className="consent"><input type="checkbox" checked={consent} onChange={(x) => setConsent(x.target.checked)} required /><span>{e.consent}</span></label>
      <button className="formbtn" type="submit" disabled={state === "sending" || !consent}>{e.waitlistCta}</button>
      {state === "error" ? <div className="formerr">{e.waitErr}</div> : null}
    </form>
  );
}
