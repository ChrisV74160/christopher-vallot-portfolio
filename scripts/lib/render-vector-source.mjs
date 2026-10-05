import { readFileSync } from "node:fs";
import { createRequire, Module } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

/** Render trusted TSX artwork sources with the installed compiler, without global loaders. */
export function loadVectorSource(url) {
  const filename = fileURLToPath(url);
  const compiled = ts.transpileModule(readFileSync(filename, "utf8"), {
    fileName: filename,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  const loaded = new Module(filename);
  loaded.filename = filename;
  loaded.require = createRequire(filename);
  loaded._compile(compiled.outputText, filename);
  return loaded.exports;
}
