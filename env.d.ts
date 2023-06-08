/// <reference types="vite/client"/>

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
}

interface ImportMta {
  readonly env: ImportMetaEnv;
}

declare module '*.vue';
