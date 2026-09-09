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

  app: {
    head: {
      title: '芒果.js',
      titleTemplate: '%s - mango.js',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '芒果帆帆的全新个人网站喵' },
        { name: 'keywords', content: '芒果帆帆, MangoFanFan, Nuxt' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  icon: {
    serverBundle: { collections: ['fa6-solid'] },
    // 全站 SSG 的关键：禁止运行时回退到 api.iconify.design
    fallbackToApi: false,
    // 可选：把扫描到的用到的图标打进客户端包，
    // 覆盖"仅在客户端交互时才出现的图标"这种 SSG 盲区
    clientBundle: { scan: true },
  },

  nitro: {
    // 仅在构建部署（nuxt build / generate，NODE_ENV=production）时启用 Cloudflare preset。
    // 不要在 dev 中启用：@nuxt/content 会依据 nitro.preset 选择对应 preset，
    // dev 下使用 cloudflare preset 会导致其客户端数据库加载依赖的
    // /__nuxt_content/<collection>/sql_dump.txt 接口返回空内容，
    // 从而出现“热更新后内容被清空 / 客户端导航后 Markdown 为空”的问题。
    // （dev 的 Cloudflare 绑定由 nitro-cloudflare-dev 提供，与此无关。）

    // ？！大肥鱼强强！？
    preset: process.env.NODE_ENV === 'production' ? 'cloudflare_module' : undefined,

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
