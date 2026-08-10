import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    rules: {
      // Existing animation and browser-capability effects intentionally derive
      // client-only state after hydration.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  globalIgnores([
    ".next/**",
    ".next-*/**",
    "node_modules/**",
    "out/**",
    "dist/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
