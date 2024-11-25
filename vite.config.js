import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  //const isGitHubPages = process.env.DEPLOY_PLATFORM === "github";
  return {
    plugins: [react()],
    base: "/", // "/" for Netlify, "/partypass-frontend/" for GitHub Pages
    build: {
      chunkSizeWarningLimit: 1000,
      minify: "terser",
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
  };
});
