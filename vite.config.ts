import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Keep three.js / R3F in their own lazy chunk so the first paint stays light.
        manualChunks: {
          gsap: ["gsap"],
        },
      },
    },
  },
});
