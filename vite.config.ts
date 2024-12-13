import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { VersionBuilder } from './VersionBuilder';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VersionBuilder()],
  server: {
    port: 8528,
    host: "0.0.0.0",
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
