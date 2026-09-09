/* eslint-disable @typescript-eslint/no-require-imports -- Node 20-compatible CommonJS tests. */
const assert = require("node:assert/strict");
const { test, beforeEach } = require("node:test");
const { createTypeScriptLoader } = require("./load-typescript.cjs");
/* eslint-enable @typescript-eslint/no-require-imports */

// node:test isolates each file in its own process. Never read credentials:
// replace the configuration, mock Resend and reject any network call.
globalThis.fetch = async () => { throw new Error("Network calls are forbidden in contact unit tests."); };
let deliveryResult = { error: null };
let deliveryCount = 0;
const load = createTypeScriptLoader({
  mocks: {
    resend: {
      Resend: class {
        emails = {
          send: async () => {
            deliveryCount += 1;
            if (deliveryResult instanceof Error) throw deliveryResult;
            return deliveryResult;
          },
        };
      },
    },
  },
});
const { getContactFormSchema, contactFormSchema } = load("lib/contact-schema.ts");
const { contactMessages } = load("i18n/messages/contact.ts");
const { POST } = load("app/api/contact/route.ts");
let requestIndex = 0;

beforeEach(() => {
  process.env.NODE_ENV = "production";
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_EMAIL;
  delete process.env.CONTACT_FROM_EMAIL;
  deliveryResult = { error: null };
  deliveryCount = 0;
});

function validForm() {
  return {
    name: "Portfolio QA", company: "", email: "QA@EXAMPLE.COM", need: "data-quality",
    message: "Automated unit test with simulated email delivery only.",
    website: "", formStartedAt: Date.now() - 5_000,
  };
}

function request(locale, body = validForm(), overrides = {}) {
  return POST(new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json", "accept-language": locale,
      "x-forwarded-for": `unit-test-${++requestIndex}`, ...overrides.headers,
    },
    body: overrides.raw ?? JSON.stringify({ ...body, locale }),
  }));
}

async function expectError(locale, body, code, status, messageKey, overrides) {
  const response = await request(locale, body, overrides);
  const payload = await response.json();
  assert.equal(response.status, status);
  assert.equal(payload.code, code);
  assert.equal(payload.message, contactMessages[locale].api[messageKey]);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  return { payload, response };
}

function configureMockDelivery() {
  process.env.RESEND_API_KEY = "unit-test-placeholder-not-a-real-key";
  process.env.CONTACT_EMAIL = "qa@example.com";
}

test("The legacy schema defaults to French", () => {
  assert.equal(contactFormSchema.parse(validForm()).locale, "fr");
});

for (const locale of ["fr", "en"]) {
  test(`${locale}: normalises email and optional company`, () => {
    const result = getContactFormSchema(locale).parse({ ...validForm(), locale });
    assert.equal(result.email, "qa@example.com");
    assert.equal(result.company, undefined);
    assert.equal(result.locale, locale);
  });

  test(`${locale}: localises validation for every visible field`, () => {
    const result = getContactFormSchema(locale).safeParse({
      ...validForm(), name: "", company: "X".repeat(121), email: "invalid", need: "invalid", message: "short", locale,
    });
    assert.equal(result.success, false);
    const errors = Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message]));
    const messages = contactMessages[locale].validation;
    assert.equal(errors.name, messages.nameMin);
    assert.equal(errors.company, messages.companyMax);
    assert.equal(errors.email, messages.emailInvalid);
    assert.equal(errors.need, messages.needInvalid);
    assert.equal(errors.message, messages.messageMin);
  });

  test(`${locale}: rejects unsupported media before parsing`, async () => {
    await expectError(locale, validForm(), "UNSUPPORTED_MEDIA_TYPE", 415, "unsupportedMediaType", { headers: { "content-type": "text/plain" } });
  });

  test(`${locale}: rejects oversized streamed content`, async () => {
    await expectError(locale, validForm(), "PAYLOAD_TOO_LARGE", 413, "payloadTooLarge", { raw: "X".repeat(17_000) });
  });

  test(`${locale}: rejects malformed JSON`, async () => {
    await expectError(locale, validForm(), "INVALID_JSON", 400, "invalidJson", { raw: "invalid" });
  });

  test(`${locale}: returns a localized API validation summary`, async () => {
    await expectError(locale, { ...validForm(), name: "" }, "VALIDATION_ERROR", 400, "validationError");
  });

  test(`${locale}: returns localized field errors`, async () => {
    const { payload } = await expectError(locale, { ...validForm(), name: "" }, "VALIDATION_ERROR", 400, "validationError");
    assert.equal(payload.fieldErrors.name[0], contactMessages[locale].validation.nameMin);
  });

  test(`${locale}: honeypot blocks submissions before delivery`, async () => {
    configureMockDelivery();
    await expectError(locale, { ...validForm(), website: "bot.example" }, "SPAM_DETECTED", 400, "spamDetected");
    assert.equal(deliveryCount, 0);
  });

  test(`${locale}: rejects submissions made too quickly`, async () => {
    await expectError(locale, { ...validForm(), formStartedAt: Date.now() }, "FORM_TIME_INVALID", 400, "formTimeInvalid");
  });

  test(`${locale}: rejects expired forms`, async () => {
    await expectError(locale, { ...validForm(), formStartedAt: Date.now() - 86_401_000 }, "FORM_TIME_INVALID", 400, "formTimeInvalid");
  });

  test(`${locale}: missing production configuration never claims delivery`, async () => {
    const { payload } = await expectError(locale, validForm(), "SERVICE_UNAVAILABLE", 503, "serviceUnavailable");
    assert.equal(payload.ok, false);
    assert.equal(deliveryCount, 0);
  });

  test(`${locale}: development validation does not send email`, async () => {
    process.env.NODE_ENV = "development";
    const { payload } = await expectError(locale, validForm(), "EMAIL_NOT_CONFIGURED", 200, "emailNotConfigured");
    assert.equal(payload.ok, true);
    assert.equal(payload.sent, false);
    assert.equal(deliveryCount, 0);
  });

  test(`${locale}: handles a simulated provider rejection`, async (context) => {
    context.mock.method(console, "error", () => {});
    configureMockDelivery();
    deliveryResult = { error: { name: "simulated" } };
    await expectError(locale, validForm(), "DELIVERY_FAILED", 502, "deliveryFailed");
    assert.equal(deliveryCount, 1);
  });

  test(`${locale}: handles a simulated provider exception`, async (context) => {
    context.mock.method(console, "error", () => {});
    configureMockDelivery();
    deliveryResult = new Error("Simulated no-network failure");
    await expectError(locale, validForm(), "DELIVERY_FAILED", 502, "deliveryFailed");
    assert.equal(deliveryCount, 1);
  });

  test(`${locale}: returns a localized simulated success`, async () => {
    configureMockDelivery();
    const response = await request(locale);
    const payload = await response.json();
    assert.equal(response.status, 200);
    assert.equal(payload.sent, true);
    assert.equal(payload.message, contactMessages[locale].api.success);
    assert.equal(deliveryCount, 1);
  });

  test(`${locale}: rate limit is localized before reading the body`, async () => {
    const overrides = { headers: { "x-forwarded-for": `rate-test-${locale}` } };
    for (let index = 0; index < 5; index += 1) {
      await request(locale, { ...validForm(), website: "bot" }, overrides);
    }
    const { response } = await expectError(locale, validForm(), "RATE_LIMITED", 429, "rateLimited", overrides);
    assert.ok(Number(response.headers.get("retry-after")) > 0);
    assert.equal(deliveryCount, 0);
  });
}

test("A supported payload locale overrides the request language", async () => {
  const response = await request("fr", validForm(), { raw: JSON.stringify({ ...validForm(), locale: "en", name: "" }) });
  const payload = await response.json();
  assert.equal(payload.message, contactMessages.en.api.validationError);
  assert.equal(payload.fieldErrors.name[0], contactMessages.en.validation.nameMin);
});

test("Unsupported locales and unknown fields are rejected by the schema", () => {
  assert.equal(contactFormSchema.safeParse({ ...validForm(), locale: "de" }).success, false);
  assert.equal(contactFormSchema.safeParse({ ...validForm(), unexpected: true }).success, false);
});
