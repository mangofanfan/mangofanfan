import { readFileSync } from 'node:fs'
import { definePerson } from 'nuxt-schema-org/schema'

// Shiki 使用语法文件里的 `name` 作为语言 id，而 @nuxtjs/mdc 与 nuxt-shiki
// 都会把请求的语言名转成小写再查找，所以这里把 id 归一化成小写的 `mcfpp`。
const mcfpp = {
  ...JSON.parse(readFileSync('./public/langs/mcfpp.tmLanguage.json', 'utf-8')),
  name: 'mcfpp',
}
const mcfunction = {
  ...JSON.parse(readFileSync('./public/langs/mcfunction.tmLanguage.json', 'utf-8')),
  name: 'mcfunction',
}

// 与 Nuxt Content / nuxt-shiki 共用的一组明暗主题
// （`default` 是 Nuxt Content 要求的必需项，取浅色主题即可）
const themes = {
  default: 'material-theme-lighter',
  light: 'material-theme-lighter',
  dark: 'material-theme-darker',
} as const

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org',
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-shiki',
  ],

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      title: '芒果客栈 [mango.js]',
      titleTemplate: '%s - 芒果客栈 [mango.js]',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '芒果帆帆的全新个人网站喵！' },
        { name: 'keywords', content: '芒果帆帆, MangoFanFan, Nuxt' },
        { property: 'og:side_name', content: '芒果客栈[mango.js]' },
        { property: 'og:locale', content: 'zh_CN' },
        { name: 'apple-mobile-web-app-title', content: '芒果客栈' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      htmlAttrs: { lang: 'zh-CN' },
    },
  },

  css: ['~/assets/css/main.css'],

  icon: {
    customCollections: [
      {
        prefix: 'fan',
        dir: './app/assets/icons',
      },
    ],
  },

  site: {
    name: '芒果.js',
    url: 'https://mango.js.cn/',
    description: '芒果帆帆的全新个人网站喵！',
  },

  robots: {
    allow: '/',
    sitemap: 'https://mango.js.cn/sitemap.xml',
  },

  schemaOrg: {
    identity: definePerson({
      name: '芒果帆帆w',
      image: '/images/acatar.png',
      description: '在校学生、独立开发者、文字工作、创意工作',
      url: 'https://mango.js.cn/',
      sameAs: [
        'https://space.bilibili.com/354535460',
        'https://github.com/mangofanfan',
        'https://www.zhihu.com/people/mang-guo-fan-fan',
      ],
    }),
  },

  content: {
    build: {
      markdown: {
        highlight: {
          langs: [mcfpp, mcfunction, 'yaml', 'json', 'bash'],
          theme: themes,
        },
      },
    },
  },

  routeRules: {
    '/': { prerender: true },
  },

  devServer: {
    port: 4000,
  },

  compatibilityDate: '2026-09-03',

  eslint: {
    config: {
      stylistic: false, // 默认就没开，写出来更明确
      formatters: false, // 也关掉；这个特性用 @stylistic 的 formatter 处理 CSS/MD/JSON，与 Prettier 职责重叠
    },
  },

  shiki: {
    // bundledLangs 只接受 shiki 内置语言名（字符串），自定义语法请通过
    // content.build.markdown.highlight.langs 注册
    bundledLangs: [
      'javascript',
      'typescript',
      'json',
      'vue',
      'html',
      'css',
      'bash',
      'yaml',
      'markdown',
    ],
    defaultTheme: themes,
    // 输出 --shiki-light / --shiki-dark CSS 变量，由 CSS 决定实际颜色
    highlightOptions: {
      defaultColor: false,
    },
  },

  // ？！大肥鱼和 GLM 都强强！？
  nitro: {
    // 仅在构建部署（nuxt build / generate，NODE_ENV=production）时启用 Cloudflare preset。
    // 不要在 dev 中启用：@nuxt/content 会依据 nitro.preset 选择对应 preset，
    // dev 下使用 cloudflare preset 会导致其客户端数据库加载依赖的
    // /__nuxt_content/<collection>/sql_dump.txt 接口返回空内容，
    // 从而出现“热更新后内容被清空 / 客户端导航后 Markdown 为空”的问题。
    // （dev 的 Cloudflare 绑定由 nitro-cloudflare-dev 提供，与此无关。）
    preset: process.env.NODE_ENV === 'production' ? 'cloudflare_module' : undefined,

    // 混合模式核心：全站预渲染
    prerender: {
      crawlLinks: true, // 从入口路由沿链接爬取所有页面（含所有博客文章）
      routes: ['/'], // 入口：首页
      ignore: ['/api/**'], // 部分 API 不预渲染，留给 Worker 运行时执行
    },

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
})
