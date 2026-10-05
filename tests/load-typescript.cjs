/* eslint-disable @typescript-eslint/no-require-imports -- Node 20-compatible CommonJS test helper. */
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
/* eslint-enable @typescript-eslint/no-require-imports */

const projectRoot = path.resolve(__dirname, "..");

/**
 * Load small server/data modules with the installed TypeScript compiler.
 * Uses the project's supported Node versions without a build or extra dependency. Each
 * loader has its own cache and mocks; Node's global loader is left untouched.
 */
function createTypeScriptLoader({ mocks = {} } = {}) {
  const cache = new Map();

  function resolveSource(sourcePath) {
    const candidates = [sourcePath, `${sourcePath}.ts`, `${sourcePath}.tsx`, path.join(sourcePath, "index.ts")];
    const filename = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
    if (!filename) throw new Error(`Test source not found: ${sourcePath}`);
    return filename;
  }

  function load(sourcePath) {
    const filename = resolveSource(path.resolve(projectRoot, sourcePath));
    if (cache.has(filename)) return cache.get(filename).exports;
    if (filename.endsWith(".json")) {
      const loaded = { exports: JSON.parse(fs.readFileSync(filename, "utf8")) };
      cache.set(filename, loaded);
      return loaded.exports;
    }

    const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      fileName: filename,
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    });
    const loaded = new Module(filename, module);
    loaded.filename = filename;
    cache.set(filename, loaded);
    const requireDependency = Module.createRequire(filename);

    loaded.require = (specifier) => {
      if (Object.hasOwn(mocks, specifier)) return mocks[specifier];
      // Never let a contact test instantiate the real mail client.
      if (specifier === "resend") throw new Error("Resend must be explicitly mocked in tests.");
      if (specifier.startsWith("@/")) return load(specifier.slice(2));
      if (specifier.startsWith(".")) return load(path.resolve(path.dirname(filename), specifier));
      return requireDependency(specifier);
    };

    loaded._compile(compiled.outputText, filename);
    loaded.loaded = true;
    return loaded.exports;
  }

  return load;
}

module.exports = { createTypeScriptLoader };
