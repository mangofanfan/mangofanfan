// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['@nuxt/image', '@nuxt/icon', '@nuxt/eslint', '@nuxt/content', 'nitro-cloudflare-dev'],

  icon: {
    serverBundle: { collections: ['fa6-solid'] },
    // 全站 SSG 的关键：禁止运行时回退到 api.iconify.design
    fallbackToApi: false,
    // 可选：把扫描到的用到的图标打进客户端包，
    // 覆盖"仅在客户端交互时才出现的图标"这种 SSG 盲区
    clientBundle: { scan: true },
  },

  nitro: {
    preset: 'cloudflare_module',

    // 混合模式核心：全站预渲染
    prerender: {
      crawlLinks: true, // 从入口路由沿链接爬取所有页面（含所有博客文章）
      routes: ['/'], // 入口：首页
      ignore: ['/api/**'], // API 不预渲染，留给 Worker 运行时执行
    },

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
})
