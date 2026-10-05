/* eslint-disable @typescript-eslint/no-require-imports -- Node-compatible test runner. */
const assert = require("node:assert/strict");
const { test } = require("node:test");
const { createTypeScriptLoader } = require("./load-typescript.cjs");
/* eslint-enable @typescript-eslint/no-require-imports */

const { isContactApiResponse } = createTypeScriptLoader()("lib/contact-contract.ts");

test("The form accepts only complete contact response variants", () => {
  for (const response of [
    { ok: true, sent: true, message: "Delivered" },
    { ok: true, sent: false, mode: "development", code: "EMAIL_NOT_CONFIGURED", message: "Not sent" },
    { ok: false, code: "VALIDATION_ERROR", message: "Invalid", fieldErrors: { name: ["Required"] } },
    { ok: false, code: "RATE_LIMITED", message: "Try later" },
  ]) {
    assert.equal(isContactApiResponse(response), true);
  }

  for (const response of [
    null, [], "Invalid",
    { ok: true, sent: false, message: "Incomplete development response" },
    { ok: true, sent: false, mode: "production", code: "EMAIL_NOT_CONFIGURED", message: "Invalid mode" },
    { ok: false, code: "UNKNOWN_ERROR", message: "Invalid code" },
    { ok: false, code: "VALIDATION_ERROR", message: 123 },
  ]) {
    assert.equal(isContactApiResponse(response), false);
  }
});

test("Malformed field errors cannot reach form rendering or focus handling", () => {
  for (const fieldErrors of [null, [], "Invalid", { name: "Required" }, { name: [123] }, { unexpected: ["Error"] }]) {
    assert.equal(isContactApiResponse({ ok: false, code: "VALIDATION_ERROR", message: "Invalid", fieldErrors }), false);
  }
  assert.equal(isContactApiResponse({ ok: false, code: "VALIDATION_ERROR", message: "Invalid", fieldErrors: {} }), true);
});
