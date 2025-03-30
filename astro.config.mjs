// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({

  vite: {
    plugins: [tailwindcss()],
  },

  env:{
    schema:{
      API_URL: envField.string({context: "server", access: "secret", optional: true}),
    }
  },

  adapter: netlify()
});