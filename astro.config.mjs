import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import netlify from "@astrojs/netlify/functions";
import cloudflare from "@astrojs/cloudflare";
import node from "@astrojs/node";
import deno from "@astrojs/deno";

// https://astro.build/config
export default defineConfig({
  site: "http://127.0.0.1:8787",
  output: "server",
  adapter: netlify(),
  integrations: [tailwind(), vue()],
  vite: {
    define: {
      "process.env.PUBLIC_API_DOMAIN": JSON.stringify(
        process.env.PUBLIC_API_DOMAIN
      ),
    },
  },
});
