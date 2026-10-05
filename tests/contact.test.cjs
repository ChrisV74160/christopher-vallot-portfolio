/* eslint-disable @typescript-eslint/no-require-imports -- Node 20-compatible CommonJS tests. */
const assert = require("node:assert/strict");
const { test, beforeEach } = require("node:test");
const { createTypeScriptLoader } = require("./load-typescript.cjs");
/* eslint-enable @typescript-eslint/no-require-imports */

// node:test isolates each file in its own process. Never read credentials:
// replace the configuration, mock Resend and reject any network call.
globalThis.fetch = async () => { throw new Error("Network calls are forbidden in contact unit tests."); };
const simulatedSuccess = () => ({ data: { id: "simulated-email-id" }, error: null, headers: {} });
let deliveryResult = simulatedSuccess();
let deliveryCount = 0;
let deliveryPayload;
const load = createTypeScriptLoader({
  mocks: {
    resend: {
      Resend: class {
        emails = {
          send: async (payload) => {
            deliveryCount += 1;
            deliveryPayload = payload;
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
  delete process.env.NETLIFY;
  delete process.env.SITE_ID;
  deliveryResult = simulatedSuccess();
  deliveryCount = 0;
  deliveryPayload = undefined;
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
    ...(overrides.raw instanceof ReadableStream ? { duplex: "half" } : {}),
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
    deliveryResult = {
      data: null,
      error: { name: "simulated", message: "Simulated provider rejection", statusCode: 422 },
      headers: {},
    };
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

for (const [label, data] of [
  ["null data", null],
  ["missing ID", {}],
  ["empty ID", { id: "" }],
  ["blank ID", { id: "   " }],
  ["non-string ID", { id: 42 }],
]) {
  test(`A provider response with ${label} cannot claim delivery`, async (context) => {
    context.mock.method(console, "error", () => {});
    configureMockDelivery();
    deliveryResult = { data, error: null, headers: {} };
    const { payload } = await expectError("en", validForm(), "DELIVERY_FAILED", 502, "deliveryFailed");
    assert.equal(payload.ok, false);
    assert.equal(deliveryCount, 1);
  });
}

test("Email delivery preserves routing, normalized values and escaped message content", async () => {
  configureMockDelivery();
  process.env.CONTACT_FROM_EMAIL = "Portfolio QA <portfolio@example.com>";
  process.env.CONTACT_EMAIL = " OWNER@EXAMPLE.COM ";
  const response = await request("en", {
    ...validForm(),
    name: "  Élodie <QA>  ",
    company: " Example & \"Company\" ",
    message: "A sufficiently long enquiry.\n<script>alert('test')</script>",
  });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).sent, true);
  assert.equal(deliveryPayload.from, "Portfolio QA <portfolio@example.com>");
  assert.equal(deliveryPayload.to, "owner@example.com");
  assert.equal(deliveryPayload.replyTo, "qa@example.com");
  assert.equal(deliveryPayload.subject, "Nouvelle demande portfolio — Qualité des données");
  assert.match(deliveryPayload.text, /Nom : Élodie <QA>\nEntreprise : Example & "Company"/);
  assert.match(deliveryPayload.text, /A sufficiently long enquiry\.\n<script>alert\('test'\)<\/script>/);
  assert.match(deliveryPayload.html, /Élodie &lt;QA&gt;/);
  assert.match(deliveryPayload.html, /Example &amp; &quot;Company&quot;/);
  assert.match(deliveryPayload.html, /&lt;script&gt;alert\(&#39;test&#39;\)&lt;\/script&gt;/);
  assert.doesNotMatch(deliveryPayload.html, /<script>/);
});

for (const [marker, address] of [["NETLIFY", "198.51.100.10"], ["SITE_ID", "198.51.100.20"]]) {
  test(`${marker}: rotating forwarded headers cannot bypass one Netlify client quota`, async () => {
    process.env[marker] = marker === "NETLIFY" ? "true" : "simulated-netlify-site";
    for (let index = 0; index < 5; index += 1) {
      const response = await request("en", { ...validForm(), website: "bot" }, {
        headers: { "x-nf-client-connection-ip": address },
      });
      assert.equal(response.status, 400);
    }
    await expectError("en", validForm(), "RATE_LIMITED", 429, "rateLimited", {
      headers: { "x-nf-client-connection-ip": address },
    });
    assert.equal(deliveryCount, 0);
  });
}

test("Distinct Netlify client IPs receive independent quotas without generic forwarding headers", async () => {
  process.env.SITE_ID = "simulated-netlify-runtime-site";
  const headers = { "x-forwarded-for": "", "x-real-ip": "" };
  for (let index = 0; index < 5; index += 1) {
    const response = await request("fr", { ...validForm(), website: "bot" }, {
      headers: { ...headers, "x-nf-client-connection-ip": "2001:db8::30" },
    });
    assert.equal(response.status, 400);
  }
  await expectError("fr", validForm(), "RATE_LIMITED", 429, "rateLimited", {
    headers: { ...headers, "x-nf-client-connection-ip": "2001:db8::30" },
  });
  const independentResponse = await request("fr", { ...validForm(), website: "bot" }, {
    headers: { ...headers, "x-nf-client-connection-ip": "2001:db8::31" },
  });
  assert.equal(independentResponse.status, 400);
});

test("Missing or invalid Netlify IPs do not fall back to caller-controlled forwarded headers", async () => {
  process.env.NETLIFY = "true";
  for (const address of ["", "invalid", "198.51.100.42, 198.51.100.43", "not-an-ip", ""]) {
    const response = await request("en", { ...validForm(), website: "bot" }, {
      headers: { "x-nf-client-connection-ip": address },
    });
    assert.equal(response.status, 400);
  }
  await expectError("en", validForm(), "RATE_LIMITED", 429, "rateLimited", {
    headers: { "x-nf-client-connection-ip": "invalid" },
  });
});

test("An oversized declared body is rejected before the stream is read", async () => {
  const stream = new ReadableStream({ pull() { throw new Error("An oversized declared body must not be read."); } });
  await expectError("en", validForm(), "PAYLOAD_TOO_LARGE", 413, "payloadTooLarge", {
    raw: stream,
    headers: { "content-length": "16385" },
  });
  assert.equal(deliveryCount, 0);
});

test("A chunked body is bounded by its actual bytes and cancels overflow", async () => {
  let cancelled = false;
  const stream = new ReadableStream({
    pull(controller) { controller.enqueue(new Uint8Array(8_000)); },
    cancel() { cancelled = true; },
  });
  await expectError("en", validForm(), "PAYLOAD_TOO_LARGE", 413, "payloadTooLarge", {
    raw: stream,
    headers: { "content-length": "1" },
  });
  assert.equal(cancelled, true);
  assert.equal(deliveryCount, 0);
});

test("A valid request at the exact body byte limit is accepted", async () => {
  configureMockDelivery();
  const raw = JSON.stringify({ ...validForm(), locale: "en" }).padEnd(16_384, " ");
  const response = await request("en", validForm(), { raw });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).sent, true);
});

test("The client quota resets when its ten-minute window expires", async (context) => {
  let now = Date.now();
  context.mock.method(Date, "now", () => now);
  const overrides = { headers: { "x-forwarded-for": "rate-window-expiry" } };
  for (let index = 0; index < 5; index += 1) {
    const response = await request("en", { ...validForm(), website: "bot" }, overrides);
    assert.equal(response.status, 400);
  }
  const { response } = await expectError("en", validForm(), "RATE_LIMITED", 429, "rateLimited", overrides);
  assert.equal(response.headers.get("retry-after"), "600");
  now += 600_000;
  const expiredWindowResponse = await request("en", { ...validForm(), website: "bot" }, overrides);
  assert.equal(expiredWindowResponse.status, 400);
});

test("Valid UTF-8 split across chunks is preserved during email delivery", async () => {
  configureMockDelivery();
  const encoded = new TextEncoder().encode(JSON.stringify({ ...validForm(), name: "Élodie QA", locale: "en" }));
  const splitIndex = encoded.indexOf(0xc3) + 1;
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoded.subarray(0, splitIndex));
      controller.enqueue(encoded.subarray(splitIndex));
      controller.close();
    },
  });
  const response = await request("en", validForm(), { raw: stream });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).sent, true);
  assert.match(deliveryPayload.text, /Nom : Élodie QA/);
});

for (const bytes of [new Uint8Array([0xff]), new Uint8Array([0xc3])]) {
  test(`Malformed UTF-8 byte ${bytes[0]} is rejected without delivery`, async () => {
    configureMockDelivery();
    await expectError("en", validForm(), "INVALID_JSON", 400, "unreadableBody", { raw: bytes });
    assert.equal(deliveryCount, 0);
  });
}
