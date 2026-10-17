"use client";

import { useRef, useState } from "react";
import { business } from "@/content/site";
import styles from "./ContactForm.module.css";

// Frontend-only form. Delivery goes to a hosted form endpoint set in NEXT_PUBLIC_CONTACT_ENDPOINT.
// Success is shown only after that endpoint answers 2xx — never assumed.
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { firstName: "", lastName: "", email: "", message: "", website: "" };

function validate(v) {
  const e = {};
  if (!v.firstName.trim()) e.firstName = "Please enter your first name.";
  if (!v.lastName.trim()) e.lastName = "Please enter your last name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address, like name@example.com.";
  if (v.message.trim().length < 10) e.message = "Please write a message of at least 10 characters.";
  return e;
}

function mailtoHref(v) {
  const name = `${v.firstName} ${v.lastName}`.trim();
  const body = `${v.message.trim()}\n\n${name}${v.email ? ` (${v.email.trim()})` : ""}`;
  const subject = `Enquiry from ${name || "the website"}`;
  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Field({ name, label, error, children }) {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      {children}
      {error && (
        <p id={`${name}-error`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | unconfigured
  const formRef = useRef(null);
  const statusRef = useRef(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    // Once a field has shown an error, re-check it live so the message clears as soon as it is fixed
    if (errors[name]) setErrors((er) => ({ ...er, [name]: validate(next)[name] }));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    if (!values[name]) return; // don't scold empty fields just for tabbing past them
    setErrors((er) => ({ ...er, [name]: validate(values)[name] }));
  };

  const focusStatus = () => requestAnimationFrame(() => statusRef.current?.focus());

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.elements[first]?.focus();
      return;
    }
    if (values.website) return; // honeypot filled → ignore

    if (!ENDPOINT) {
      setStatus("unconfigured");
      focusStatus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: `${values.firstName.trim()} ${values.lastName.trim()}`,
          email: values.email.trim(),
          message: values.message.trim(),
          _subject: "Website enquiry — The Spirit Sound Gallery",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      setValues(EMPTY);
    } catch {
      setStatus("error");
    }
    focusStatus();
  };

  const inputProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange,
    onBlur,
    required: true,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  if (status === "sent") {
    return (
      <div className={styles.result} role="status" tabIndex={-1} ref={statusRef}>
        <h3 className={styles.resultTitle}>Thank you. Your message has been sent.</h3>
        <p>We will reply to the email address you gave us.</p>
        <button type="button" className="text-link" onClick={() => setStatus("idle")}>
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
      <p className={styles.note}>All fields are required.</p>

      <div className={styles.row}>
        <Field name="firstName" label="First name" error={errors.firstName}>
          <input type="text" autoComplete="given-name" {...inputProps("firstName")} />
        </Field>
        <Field name="lastName" label="Last name" error={errors.lastName}>
          <input type="text" autoComplete="family-name" {...inputProps("lastName")} />
        </Field>
      </div>

      <Field name="email" label="Email" error={errors.email}>
        <input type="email" inputMode="email" autoComplete="email" {...inputProps("email")} />
      </Field>

      <Field name="message" label="Your message" error={errors.message}>
        <textarea rows={6} {...inputProps("message")} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
      </div>

      <div>
        <button type="submit" className="button" disabled={status === "sending"} aria-busy={status === "sending" || undefined}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className={styles.liveRegion}>
        {status === "error" && (
          <div className={styles.alert}>
            <p>
              <strong>Your message was not sent.</strong> Something went wrong while sending. Please try again, or contact us
              directly:
            </p>
            <Fallback values={values} />
          </div>
        )}
        {status === "unconfigured" && (
          <div className={styles.alert}>
            <p>
              <strong>Your message has not been sent.</strong> Online sending is not available yet. You can send the same
              message by email or reach us on WhatsApp:
            </p>
            <Fallback values={values} />
          </div>
        )}
      </div>
    </form>
  );
}

function Fallback({ values }) {
  return (
    <div className="actions">
      <a className="button" href={mailtoHref(values)}>
        Send by email
      </a>
      <a className="button button--ghost" href={business.whatsapp} target="_blank" rel="noopener noreferrer">
        WhatsApp us<span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
