/* eslint-disable @typescript-eslint/no-require-imports -- Node-compatible test runner. */
const assert = require("node:assert/strict");
const { execFileSync, spawnSync } = require("node:child_process");
const { copyFileSync, existsSync, mkdirSync, mkdtempSync, rmSync, symlinkSync } = require("node:fs");
const { basename, dirname, join, resolve } = require("node:path");
const { test } = require("node:test");

const root = resolve(__dirname, "..");
const npmCli = process.env.npm_execpath || join(dirname(require.resolve("npm/package.json", {
  paths: [dirname(process.execPath), resolve(dirname(process.execPath), "../lib")],
})), "bin/npm-cli.js");

test("Type checking works on a clean checkout before any Next.js build or dev server", { timeout: 60_000 }, t => {
  const directory = mkdtempSync(join(__dirname, ".typecheck-"));
  t.after(() => {
    assert.equal(dirname(directory), __dirname);
    assert.ok(basename(directory).startsWith(".typecheck-"));
    rmSync(directory, { recursive: true, force: true });
  });

  // Copy tracked files from the working tree, excluding ignored local type files,
  // build output and credentials. Reuse installed packages without downloading.
  const files = execFileSync("git", ["ls-files", "-z"], { cwd: root, encoding: "utf8" })
    .split("\0").filter(Boolean);
  for (const file of files) {
    const destination = join(directory, file);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(join(root, file), destination);
  }
  symlinkSync(join(root, "node_modules"), join(directory, "node_modules"),
    process.platform === "win32" ? "junction" : "dir");
  assert.equal(existsSync(join(directory, "next-env.d.ts")), false);
  assert.equal(existsSync(join(directory, ".next")), false);

  const result = spawnSync(process.execPath, [npmCli, "run", "typecheck"], {
    cwd: directory,
    encoding: "utf8",
    timeout: 55_000,
    windowsHide: true,
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1",
      NEXT_PUBLIC_SITE_URL: "https://christophervallot.fr", SITE_ENV: "preview" },
  });
  assert.equal(result.status, 0, result.error?.message || result.stdout + result.stderr);
});
