import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Force-fresh GLB/FBX during dev so model edits don't get masked by the browser cache.
  server: {
    headers: {
      "Cache-Control": "no-store",
    },
  },
});
