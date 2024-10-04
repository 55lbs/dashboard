/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    paraglide: {
      lang: string;
      dir: string;
    };
    email: string;
  }
}

interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
