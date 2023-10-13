import * as esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["./src/index.ts"], // Your entry file
    bundle: true,
    outfile: "./dist/bundle.mjs", // Output bundled file
    platform: "node", // Target platform
    minify: false, // Minify the code
    format: "esm",
  })
  .catch(() => process.exit(1));
