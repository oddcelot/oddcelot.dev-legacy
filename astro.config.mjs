import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
  site: "https://oddcelot.dev",
  adapter: netlify(),
  integrations: [solid()],
});
