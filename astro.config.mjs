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
    resolve: {
      alias: {
        // @ts-ignore
        "@": path.resolve("./src"), // Ensure this is correct
      },
    },
    plugins: [tailwindcss(), react()],
    optimizeDeps: {
      include: ["swiper"],
    },
  },

  env:{
    schema:{
      API_URL: envField.string({context: "server", access: "secret", optional: true}),
    }
  },

  adapter: vercel()
});