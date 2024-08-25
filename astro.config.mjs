import { defineConfig } from 'astro/config';
import paraglide from '@inlang/paraglide-astro';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';
import svgr from 'vite-plugin-svgr';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Use astro's i18n routing for deciding which language to use
  i18n: {
    locales: ['en', 'pt-br'],
    defaultLocale: 'en',
  },
  output: 'server',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    paraglide({
      project: './project.inlang',
      outdir: './libs/i18n/src/paraglide',
    }),
    react(),
  ],
  adapter: vercel(),
  vite: {
    server: {
      fs: {
        strict: false,
      },
    },
    plugins: [
      svgr({
        svgrOptions: {},
      }),
    ],
  },
});
