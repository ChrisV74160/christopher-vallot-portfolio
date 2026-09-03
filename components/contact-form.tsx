"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import {
  CONTACT_NEED_OPTIONS,
  type ContactApiResponse,
  type ContactFieldErrors,
  type ContactFormInput,
  type ContactNeed,
} from "@/lib/contact-contract";

type SubmissionStatus = {
  type: "idle" | "pending" | "success" | "development" | "error";
  message: string;
};

const INITIAL_STATUS: SubmissionStatus = {
  type: "idle",
  message: "",
};
const REQUEST_TIMEOUT_MS = 20_000;

const VISIBLE_FIELDS = [
  "name",
  "company",
  "email",
  "need",
  "message",
] as const satisfies readonly (keyof ContactFieldErrors)[];

function isContactApiResponse(value: unknown): value is ContactApiResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const response = value as Record<string, unknown>;

  if (typeof response.message !== "string") {
    return false;
  }

  if (response.ok === true) {
    return typeof response.sent === "boolean";
  }

  return response.ok === false && typeof response.code === "string";
}

function focusFirstInvalidField(
  form: HTMLFormElement,
  errors: ContactFieldErrors,
) {
  const firstInvalidField = VISIBLE_FIELDS.find(
    (field) => (errors[field]?.length ?? 0) > 0,
  );

  if (!firstInvalidField) {
    return;
  }

  const control = form.elements.namedItem(firstInvalidField);

  if (control instanceof HTMLElement) {
    window.requestAnimationFrame(() => control.focus());
  }
}

export function ContactForm() {
  const [status, setStatus] = useState<SubmissionStatus>(INITIAL_STATUS);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const formStartedAt = useRef(0);
  const submissionInFlight = useRef(false);

  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  const isSubmitting = status.type === "pending";

  function clearFieldError(field: keyof ContactFieldErrors) {
    setFieldErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submissionInFlight.current) {
      return;
    }

    submissionInFlight.current = true;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const startedAt = formStartedAt.current || Date.now();
    const payload: ContactFormInput = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      need: String(formData.get("need") ?? "") as ContactNeed,
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
      formStartedAt: startedAt,
    };

    setFieldErrors({});
    setStatus({ type: "pending", message: "Envoi en cours…" });
    const requestController = new AbortController();
    const requestTimeout = window.setTimeout(
      () => requestController.abort(),
      REQUEST_TIMEOUT_MS,
    );

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: requestController.signal,
      });
      const result: unknown = await response.json();

      if (!isContactApiResponse(result)) {
        throw new Error("Réponse inattendue du service de contact.");
      }

      if (result.ok) {
        if (result.sent) {
          form.reset();
          formStartedAt.current = Date.now();
          setFieldErrors({});
          setStatus({ type: "success", message: result.message });
          return;
        }

        setStatus({
          type: "development",
          message: `Configuration requise — ${result.message}`,
        });
        return;
      }

      const nextFieldErrors = result.fieldErrors ?? {};
      setFieldErrors(nextFieldErrors);
      setStatus({ type: "error", message: result.message });
      focusFirstInvalidField(form, nextFieldErrors);
    } catch (error) {
      const timedOut =
        error instanceof DOMException && error.name === "AbortError";

      setStatus({
        type: "error",
        message: timedOut
          ? "L’envoi prend trop de temps. Réessayez ou utilisez l’adresse e-mail indiquée à côté du formulaire."
          : "Le service de contact ne répond pas pour le moment. Réessayez dans quelques instants ou utilisez l’adresse e-mail indiquée à côté du formulaire.",
      });
    } finally {
      window.clearTimeout(requestTimeout);
      submissionInFlight.current = false;
    }
  }

  const nameError = fieldErrors.name?.[0];
  const companyError = fieldErrors.company?.[0];
  const emailError = fieldErrors.email?.[0];
  const needError = fieldErrors.need?.[0];
  const messageError = fieldErrors.message?.[0];
  const statusTone =
    status.type === "success"
      ? "success"
      : status.type === "error" || status.type === "development"
        ? "error"
        : undefined;

  return (
    <form
      className="contact-form"
      aria-label="Formulaire de contact"
      aria-busy={isSubmitting}
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <label htmlFor="contact-name">Nom *</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          minLength={2}
          maxLength={80}
          placeholder="Votre nom"
          required
          aria-invalid={Boolean(nameError)}
          aria-describedby={nameError ? "contact-name-error" : undefined}
          onChange={() => clearFieldError("name")}
        />
        {nameError ? (
          <p id="contact-name-error" className="form-error">
            {nameError}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="contact-company">Société (facultatif)</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={120}
          placeholder="Votre entreprise (facultatif)"
          aria-invalid={Boolean(companyError)}
          aria-describedby={companyError ? "contact-company-error" : undefined}
          onChange={() => clearFieldError("company")}
        />
        {companyError ? (
          <p id="contact-company-error" className="form-error">
            {companyError}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="contact-email">E-mail *</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          maxLength={254}
          placeholder="vous@entreprise.fr"
          required
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? "contact-email-error" : undefined}
          onChange={() => clearFieldError("email")}
        />
        {emailError ? (
          <p id="contact-email-error" className="form-error">
            {emailError}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="contact-need">Type de besoin *</label>
        <select
          id="contact-need"
          name="need"
          defaultValue=""
          required
          aria-invalid={Boolean(needError)}
          aria-describedby={needError ? "contact-need-error" : undefined}
          onChange={() => clearFieldError("need")}
        >
          <option value="" disabled>
            Sélectionnez un besoin
          </option>
          {CONTACT_NEED_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {needError ? (
          <p id="contact-need-error" className="form-error">
            {needError}
          </p>
        ) : null}
      </div>

      <div className="form-field form-field--full">
        <label htmlFor="contact-message">Message *</label>
        <textarea
          id="contact-message"
          name="message"
          minLength={20}
          maxLength={3000}
          rows={6}
          placeholder="Décrivez votre contexte, vos données et le résultat attendu."
          required
          aria-invalid={Boolean(messageError)}
          aria-describedby={messageError ? "contact-message-error" : undefined}
          onChange={() => clearFieldError("message")}
        />
        {messageError ? (
          <p id="contact-message-error" className="form-error">
            {messageError}
          </p>
        ) : null}
      </div>

      <div className="form-honeypot" aria-hidden="true" inert>
        <label htmlFor="contact-website">Votre site web</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          autoComplete="off"
          maxLength={200}
          tabIndex={-1}
        />
      </div>

      <div className="form-submit-row">
        <button
          className="button-link button-link--accent"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande"}
        </button>
        <p className="form-note">
          Les champs marqués d’un astérisque sont obligatoires. N’indiquez pas
          de données sensibles dans votre message.
        </p>
      </div>

      <p
        className="form-status form-field--full"
        data-status={statusTone}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status.message}
      </p>
    </form>
  );
}

export default ContactForm;
