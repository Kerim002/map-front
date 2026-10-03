import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy:
      process.env.NODE_ENV === "development"
        ? {
          "/api": {
            // target: "https://dev.tmsoft12.cloud/",
            // target: "http://192.168.1.74:8000/",
            // target: "https://api.tmsoft12.cloud",
            // target: "http://localhost:4000",
            target: "http://216.250.12.42:4000",
            changeOrigin: true,
            secure: false,
          },
        }
        : undefined,

    host: true,
    port: 3000
  },
});
