import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Cache-Control": "no-store",
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Keep critical Stage 0 chunks free of Three.js and GSAP so the landing
        // headline and CTAs render immediately; 3D scenes stream in asynchronously.
        manualChunks(id) {
          if (id.includes("vite/preload-helper")) return "vendor-react";
          if (!id.includes("node_modules")) return;
          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/scheduler/")
          ) {
            return "vendor-react";
          }
          if (id.includes("/node_modules/gsap/")) {
            return "vendor-gsap";
          }
          if (
            id.includes("/node_modules/three/") ||
            id.includes("/node_modules/three-stdlib/")
          ) {
            return "vendor-three";
          }
        },
      },
    },
  },
});
