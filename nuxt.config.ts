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
    'nuxt-ai-ready',
    'nuxt-seo-utils',
    '@nuxt/fonts',
    'nuxt-security',
    '@nuxthub/core',
  ],

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      title: '芒果客栈 [mango.js]',
      titleTemplate: '%s - 芒果客栈 [mango.js]',
      meta: [
        { name: 'keywords', content: '芒果帆帆,MangoFanFan,Nuxt,博客' },
        { property: 'og:locale', content: 'zh_CN' },
        { name: 'apple-mobile-web-app-title', content: '芒果客栈' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'alternate', type: 'application/rss+xml', title: '芒果客栈', href: '/rss.xml' },
        { rel: 'alternate', type: 'application/atom+xml', title: '芒果客栈', href: '/atom.xml' },
        { rel: 'alternate', type: 'application/feed+json', title: '芒果客栈', href: '/feed.json' },
      ],
      htmlAttrs: { lang: 'zh-CN' },
    },
  },

  css: ['~/assets/css/main.css'],

  fonts: {
    families: [
      { name: 'Noto Sans SC Variable', provider: 'npm' },
      { name: 'Noto Serif SC Variable', provider: 'npm' },
    ],
  },

  image: {
    provider: process.env.NODE_ENV === 'production' ? 'cloudflare' : 'ipx',
    cloudflare: {
      baseURL: 'https://mango.js.cn',
    },
    format: ['avif', 'webp'],
    densities: [1, 2],
    screens: { sm: 480, md: 768, lg: 1024, xxl: 1600, '2xl': 1920 },
  },

  icon: {
    customCollections: [
      {
        prefix: 'fan',
        dir: './app/assets/icons',
      },
    ],
  },

  hub: {
    db: 'sqlite',
  },

  runtimeConfig: {
    turnstileSecret: '',

    public: {
      turnstileSiteKey: '0x4AAAAAAFXdbTxM6IDtE_vI',
    },
  },

  site: {
    name: '芒果客栈',
    url: 'https://mango.js.cn/',
    description: '芒果帆帆的全新个人网站喵！',
    defaultLocale: 'zh-CN',
  },

  sitemap: {
    zeroRuntime: true,
  },

  robots: {
    allow: '/',
    disallow: ['/_fonts', '/__nuxt_content'],
    sitemap: 'https://mango.js.cn/sitemap.xml',
  },

  aiReady: {
    contentSignal: {
      aiTrain: false,
      search: true,
      aiInput: true,
    },
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

  mdc: {
    highlight: {
      shikiEngine: 'javascript',
    },
  },

  vite: {
    resolve: {
      alias: {
        // Cloudflare preset 会给 nitro 启用 wasm 支持，`nuxt:nitro:ssr-conditions`
        // 插件随之把 `unwasm` 解析条件同步进 SSR Vite 构建。这会让 nuxt-shiki
        // runtime 里的 `import("shiki/core")` 解析到 core-unwasm.mjs，后者内部的
        // `import('shiki/wasm')` 在 unwasm 条件下解析到裸 onig.wasm 二进制；
        // Rolldown（Vite 8）把 wasm 当模块解析其 Emscripten "env" 导入，
        // 产生无法 resolve 的裸 `import from "env"`，导致 build 失败。
        // nuxt-shiki 自带 JS 正则引擎，wasm loader 根本不会被调用，
        // 这里强制走默认入口（与 dev / 非 Cloudflare 构建行为完全一致：
        // shiki/dist/core.mjs 本身就是 `export * from '@shikijs/core'`）。
        'shiki/core': '@shikijs/core',
      },
    },
  },

  security: {
    contentSecurityPolicyReportOnly: process.env.NODE_ENV !== 'production',
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', 'https:'],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          "'nonce-{{nonce}}'",
          "'wasm-unsafe-eval'",
          'https://challenges.cloudflare.com', // CloudFlare Turnstile 挑战域名
        ],
        'require-trusted-types-for': "'script'",
        'trusted-types': [
          'vue', // Vue 需要
          'sanitizer', // 保留，允许部分浏览器扩展使用此规则，比如沉浸式翻译
        ],
      },
      crossOriginResourcePolicy: 'cross-origin',
    },
    // 模块在检测到 SSG 构建时，会自动启用以下配置：
    ssg: {
      meta: true, // 将 CSP 策略注入为 <meta http-equiv="Content-Security-Policy">
      hashScripts: true, // 自动为所有静态内联脚本计算并注入 SHA 哈希值
      hashStyles: false, // 样式根据需求决定是否开启
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/rss.xml': { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } },
    '/atom.xml': { headers: { 'content-type': 'application/atom+xml; charset=utf-8' } },
    '/feed.json': { headers: { 'content-type': 'application/feed+json; charset=utf-8' } },
    '/404.html': { prerender: true }, // ← 补上这一行，兜底页才会被构建出来
  },

  experimental: {
    prerenderErrorPages: true, // ← 不加它，404.html 只是空壳
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
      routes: ['/', '/rss.xml', '/atom.xml', '/feed.json'],
      ignore: ['/api/**'], // API 不预渲染，留给 Worker 运行时执行
    },

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },

  typescript: {
    appTsConfig: {
      compilerOptions: {
        types: ['cloudflare-turnstile'],
      },
    },
  },
})
