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
  build: {
    rollupOptions: {
      output: {
        // three.js core is imported by BOTH the character scene (MainContainer)
        // and the tech-stack playground (TechStack). Without this it gets
        // duplicated into each lazy chunk; hoisting it into one shared vendor
        // chunk removes the duplication and lets the browser cache it once.
        // Rapier ships its physics engine as inlined WASM (~600KB) — isolating
        // it keeps that heavy, rarely-changing blob in its own cacheable file.
        manualChunks(id) {
          // Vite's dynamic-import preload helper is a virtual module the entry
          // always needs. Pin it to the eager react chunk so Rollup can't park
          // it inside a heavy lazy vendor chunk (which would drag that chunk
          // into the entry's static graph and preload it).
          if (id.includes("vite/preload-helper")) return "vendor-react";
          if (!id.includes("node_modules")) return;
          // React must be isolated first: with a partial manualChunks map it
          // otherwise gets absorbed into whichever heavy vendor chunk shares it
          // (here vendor-rapier), forcing the entry to statically import — and
          // therefore eagerly preload — that 850KB chunk on first paint.
          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/scheduler/")
          ) {
            return "vendor-react";
          }
          // gsap is shared by the character scene (eager) and the tech-stack
          // scene (deferred). Give it an explicit home so it isn't absorbed into
          // vendor-rapier — otherwise the eager scene would statically import,
          // and thus download, the 850KB rapier chunk just to get gsap.
          if (id.includes("/node_modules/gsap/")) {
            return "vendor-gsap";
          }
          if (id.includes("@dimforge") || id.includes("@react-three/rapier")) {
            return "vendor-rapier";
          }
          // three core + three-stdlib (GLTF/FBX loaders): three-stdlib is used
          // eagerly by the character scene AND transitively by drei on the
          // deferred scene, so it must be pinned here too — otherwise it gets
          // absorbed into vendor-rapier and drags that chunk into first paint.
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
