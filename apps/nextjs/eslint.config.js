import baseConfig, { restrictEnvAccess } from "@tooba/eslint-config/base";
import nextjsConfig from "@tooba/eslint-config/nextjs";
import reactConfig from "@tooba/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
