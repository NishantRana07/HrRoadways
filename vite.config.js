import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // Enable React plugin for JSX and Fast Refresh support
  plugins: [react()],

  // Base public path when served in production
  base: "/",

  // Build configuration
  build: {
    // Output directory for the production build
    outDir: "dist",
  },
});
