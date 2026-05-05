export default defineNuxtConfig({
  compatibilityDate: "2026-04-26",
  modules: ["@nuxt/content"],
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      siteUrl: import.meta.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: "zh-CN" },
      titleTemplate: "%s | Jet Blog",
      meta: [
        {
          name: "description",
          content: "记录技术、阅读与生活思考的个人博客。",
        },
      ],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
});
