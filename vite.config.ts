import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  base: "/virtual-business-card-background-generator/",
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts"
  }
});
