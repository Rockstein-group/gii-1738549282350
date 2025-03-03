import { defineConfig } from "astro/config";
import compressor from "astro-compressor";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://greenitimpact.io",
  integrations: [
    tailwind(),
    robotsTxt(),
    sitemap(),
    compressor({ gzip: true, brotli: true }),
  ],
});
