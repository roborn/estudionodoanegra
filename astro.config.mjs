import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://estudionodoanegra.com",
  base: "/",
  integrations: [
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "pt",
        locales: {
          pt: "pt-PT",
          en: "en-US",
          de: "de-DE",
          es: "es-ES",
          fr: "fr-FR",
        },
      },
    }),
  ],
});

