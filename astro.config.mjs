import { defineConfig } from "astro/config";
import Netlify from "@astrojs/netlify/functions";
import Solid from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://oddcelot.dev",
  adapter: Netlify(),
  integrations: [Solid()],
  experimental: {
    integrations: true,
  },
});
