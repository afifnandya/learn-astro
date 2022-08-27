import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import astroI18next from "astro-i18next";
import vue from "@astrojs/vue";
import image from "@astrojs/image";
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  site: "https://6309847287e9020007a6aee3--beamish-mooncake-15cb69.netlify.app",
  output: "server",
  adapter: netlify(),
  integrations: [tailwind(), vue(), astroI18next(), image()],
});
