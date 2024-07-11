interface ImportMetaEnv {
  readonly VITE_APP_ENV: string;
  // 在此处添加更多的环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}