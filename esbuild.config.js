const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["./src/index.ts"], // Your entry file
    bundle: true,
    outfile: "./dist/index.js", // Output bundled file
    platform: "node", // Target platform
    minify: false, // Minify the code
    format: "cjs",
  })
  .catch(() => process.exit(1));
