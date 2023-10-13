import * as esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["./src/index.ts"], // Your entry file
    bundle: true,
    outfile: "./dist/bundle.js", // Output bundled file
    platform: "node", // Target platform
    minify: true, // Minify the code
  })
  .catch(() => process.exit(1));
