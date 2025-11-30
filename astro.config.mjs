// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from "@astrojs/cloudflare";

import node from '@astrojs/node';

const DEV = process.env.NODE_ENV === 'development';

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
  adapter: DEV ? node({mode: 'standalone'}) : cloudflare(),
  integrations: [
    react(),
    
  ]
});