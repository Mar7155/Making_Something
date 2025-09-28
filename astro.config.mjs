// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

import clerk from '@clerk/astro';
import { esES } from "@clerk/localizations";

import tailwindcss from '@tailwindcss/vite';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), react()],
  },

  env:{
    schema:{
      API_URL: envField.string({context: "server", access: "secret", optional: true}),
      PUBLIC_CLERK_PUBLISHABLE_KEY: envField.string({context: "server", access: "secret", optional: true}),
      CLERK_SECRET_KEY: envField.string({context: "server", access: "secret", optional: true}),
      CLERK_WEBHOOK_SIGNING_SECRET: envField.string({context: "server", access: 'public'}),
    }
  },
  output: 'server',
  adapter: cloudflare(),
  integrations: [react(), clerk({
    localization: esES,
  })]
});