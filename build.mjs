import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { extname } from "node:path";
import { createHash } from "node:crypto";
import { rollup } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import swc from "@swc/core";
import esbuild from "rollup-plugin-esbuild";

const extensions = [".js", ".jsx", ".mjs", ".ts", ".tsx", ".cts", ".mts"];
const plugins = [
  nodeResolve(), commonjs(),
  { name: "swc", async transform(code, id) {
      const ext = extname(id);
      if (!extensions.includes(ext)) return null;
      const ts = ext.includes("ts");
      const result = await swc.transform(code, {
        filename: id,
        jsc: { externalHelpers: true, parser: { syntax: ts ? "typescript" : "ecmascript", tsx: ts ? ext.endsWith("x") : undefined, jsx: !ts ? ext.endsWith("x") : undefined } },
        env: { targets: "fully supports es6" }
      });
      return result.code;
  }},
  esbuild({ minify: true })
];

await mkdir("./dist", { recursive: true });
for (const plugin of await readdir("./plugins")) {
  const base = `./plugins/${plugin}`;
  const manifest = JSON.parse(await readFile(`${base}/manifest.json`, "utf8"));
  const out = `./dist/${plugin}`;
  await mkdir(out, { recursive: true });
  const bundle = await rollup({ input: `${base}/${manifest.main}`, onwarn: () => {}, plugins });
  await bundle.write({
    file: `${out}/index.js`, format: "iife", compact: true, exports: "named",
    globals(id) { if (id.startsWith("@vendetta")) return id.substring(1).replaceAll("/", "."); if (id === "react") return "window.React"; return null; }
  });
  await bundle.close();
  manifest.hash = createHash("sha256").update(await readFile(`${out}/index.js`)).digest("hex");
  manifest.main = "index.js";
  await writeFile(`${out}/manifest.json`, JSON.stringify(manifest));
  console.log(`Built ${manifest.name}`);
}
