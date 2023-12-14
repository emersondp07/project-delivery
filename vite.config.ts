import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      ["src/modules/clients/controllers/**", "prisma"],
      ["src/modules/deliveryman/controllers/**", "prisma"],
    ],
  },
});
