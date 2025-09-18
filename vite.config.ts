import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // For GitHub Pages project sites set GH_PAGES_BASE to "/<repo>/".
  // For user/org sites keep it as "/".
  base: process.env.GH_PAGES_BASE || "/",
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin(), spa404Plugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}

function spa404Plugin(): Plugin {
  return {
    name: "spa-404-plugin",
    apply: "build",
    closeBundle() {
      const outDir = path.resolve(__dirname, "dist/spa");
      const index = path.join(outDir, "index.html");
      const target = path.join(outDir, "404.html");
      try {
        if (fs.existsSync(index)) {
          fs.copyFileSync(index, target);
        }
      } catch (e) {
        console.warn("Could not create 404.html for SPA fallback", e);
      }
    },
  };
}
