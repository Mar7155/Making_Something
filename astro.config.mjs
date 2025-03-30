// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import path from 'path';

// https://astro.build/config
export default defineConfig({
  integrations: [react({
    experimentalReactChildren: true,
  })],

  vite: {
    // @ts-ignore
    plugins: [tailwindcss(), react()],
    optimizeDeps: {
      include: ["swiper"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@tests": path.resolve(__dirname, "./tests")
      }
    }
  },

  env:{
    schema:{
      API_URL: envField.string({context: "server", access: "secret", optional: true}),
    }
  },

  adapter: vercel()
});