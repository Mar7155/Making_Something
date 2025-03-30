// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

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
        "@": "./src",
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