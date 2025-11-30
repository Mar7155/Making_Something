// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from "@astrojs/cloudflare";

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), react()],
  },

  env:{
    schema:{
      API_URL: envField.string({context:'client', access: "public", optional: true}),
    }
  },
  site: 'https://makingsomething.store/',
  output: 'server',
  adapter: node({mode: 'standalone'}),
  integrations: [
    react(),
    
  ]
});