import { defineConfig } from "vite";
import path from "path";

export default ({ mode }) => {
  process.env = { ...process.env };

  return defineConfig({
    plugins: [],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};
