/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  VITE_ARWEAVE_GATEWAY_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
