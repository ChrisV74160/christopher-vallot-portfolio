"use client";

import { useEffect, useRef, useState, type FormEvent, type InvalidEvent } from "react";
import { ArrowRight, Building2, FileText, List, Mail, UserRound } from "lucide-react";

import { localizedHref, type Locale } from "@/i18n/config";
import { contactMessages } from "@/i18n/messages/contact";

import {
  CONTACT_NEEDS,
  isContactApiResponse,
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

export function ContactForm({ locale = "fr" }: { locale?: Locale }) {
  const messages = contactMessages[locale];
  const [status, setStatus] = useState<SubmissionStatus>(INITIAL_STATUS);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const formStartedAt = useRef(0);
  const submissionInFlight = useRef(false);

  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  const isSubmitting = status.type === "pending";

  // Native validation follows the page language, not the browser UI language.
  function localizeNativeValidation(event: InvalidEvent<HTMLFormElement>) {
    const control = event.target;
    if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement)) return;
    const validation = messages.validation;
    const errors: Record<string, string> = {
      name: control.validity.valueMissing ? validation.nameRequired : control.validity.tooLong ? validation.nameMax : validation.nameMin,
      company: validation.companyMax,
      email: control.validity.valueMissing ? validation.emailRequired : control.validity.tooLong ? validation.emailMax : validation.emailInvalid,
      need: validation.needInvalid,
      message: control.validity.valueMissing ? validation.messageRequired : control.validity.tooLong ? validation.messageMax : validation.messageMin,
    };
    control.setCustomValidity(errors[control.name] ?? "");
  }

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
      locale,
    };

    setFieldErrors({});
    setStatus({ type: "pending", message: messages.pending });
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
          "Accept-Language": locale,
        },
        body: JSON.stringify(payload),
        signal: requestController.signal,
      });
      const result: unknown = await response.json();

      if (!isContactApiResponse(result) || response.ok !== result.ok) {
        throw new Error(messages.unexpectedResponse);
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
          message: `${messages.configurationRequired}${result.message}`,
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
          ? messages.timeout
          : messages.networkError,
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
      aria-label={messages.formLabel}
      aria-busy={isSubmitting}
      onSubmit={handleSubmit}
      onInvalidCapture={localizeNativeValidation}
      onInput={(event) => {
        const control = event.target;
        if (control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement) {
          control.setCustomValidity("");
        }
      }}
    >
      <div className="form-field">
        <label htmlFor="contact-name">{messages.fields.name}</label>
        <div className="contact-control">
        <UserRound aria-hidden="true" size={19} />
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          minLength={2}
          maxLength={80}
          placeholder={messages.placeholders.name}
          required
          aria-invalid={Boolean(nameError)}
          aria-describedby={nameError ? "contact-name-error" : undefined}
          onChange={() => clearFieldError("name")}
        />
        </div>
        {nameError ? (
          <p id="contact-name-error" className="form-error">
            {nameError}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="contact-company">{messages.fields.company}</label>
        <div className="contact-control">
        <Building2 aria-hidden="true" size={19} />
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={120}
          placeholder={messages.placeholders.company}
          aria-invalid={Boolean(companyError)}
          aria-describedby={companyError ? "contact-company-error" : undefined}
          onChange={() => clearFieldError("company")}
        />
        </div>
        {companyError ? (
          <p id="contact-company-error" className="form-error">
            {companyError}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="contact-email">{messages.fields.email}</label>
        <div className="contact-control">
        <Mail aria-hidden="true" size={19} />
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          maxLength={254}
          placeholder={messages.placeholders.email}
          required
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? "contact-email-error" : undefined}
          onChange={() => clearFieldError("email")}
        />
        </div>
        {emailError ? (
          <p id="contact-email-error" className="form-error">
            {emailError}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="contact-need">{messages.fields.need}</label>
        <div className="contact-control">
        <List aria-hidden="true" size={19} />
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
            {messages.selectNeed}
          </option>
          {CONTACT_NEEDS.map((value) => (
            <option key={value} value={value}>
              {messages.needLabels[value]}
            </option>
          ))}
        </select>
        </div>
        {needError ? (
          <p id="contact-need-error" className="form-error">
            {needError}
          </p>
        ) : null}
      </div>

      <div className="form-field form-field--full">
        <label htmlFor="contact-message">{messages.fields.message}</label>
        <div className="contact-control">
        <FileText aria-hidden="true" size={19} />
        <textarea
          id="contact-message"
          name="message"
          minLength={20}
          maxLength={3000}
          rows={6}
          placeholder={messages.placeholders.message}
          required
          aria-invalid={Boolean(messageError)}
          aria-describedby={messageError ? "contact-message-error" : undefined}
          onChange={() => clearFieldError("message")}
        />
        </div>
        {messageError ? (
          <p id="contact-message-error" className="form-error">
            {messageError}
          </p>
        ) : null}
      </div>

      <div className="form-honeypot" aria-hidden="true" inert>
        <label htmlFor="contact-website">{messages.fields.website}</label>
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
          {isSubmitting ? messages.pending : messages.submit}
          <ArrowRight aria-hidden="true" size={19} />
        </button>
        <p className="form-note">
          {messages.note}{" "}
          <a href={localizedHref("/politique-confidentialite", locale)}>{messages.privacy}</a>
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
