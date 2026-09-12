// https://nuxt.com/docs/api/configuration/nuxt-config
import { execFileSync } from 'node:child_process'
import tailwindcss from '@tailwindcss/vite'

/**
 * 构建期读取 git 提交历史，通过 nitro.virtual 烘焙进服务端产物（虚拟模块 `#changelog`）。
 *
 * 为什么不能在 Worker 运行时跑 simple-git / child_process：
 * workerd 既没有 git 二进制，也不支持 node:child_process；server 代码里
 * 模块顶层的 simpleGit() 会在 Worker 上传校验阶段（Cloudflare 错误码 10021，
 * workerd 会执行模块顶层代码）直接抛 "t40(...).default is not a function"，
 * 表现为「部署失败而非构建失败」。
 * 而 Workers Builds 的构建容器里 git 是可用的（此前 /toy/self/log 预渲染时
 * /api/changelog 就是在构建容器里成功执行的），所以把取数放在构建期。
 */
function loadChangelog(max = 200) {
  try {
    const out = execFileSync(
      'git',
      [
        'log',
        '-n',
        String(max),
        '--no-merges',
        '--pretty=format:%H\u001f%h\u001f%aI\u001f%an\u001f%s',
      ],
      { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }
    ).trim()

    return out
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        // \u001f（单元分隔符）做字段分隔，避免与提交信息中的任意字符冲突
        const [hash, short, date, author, message] = line.split('\u001f')
        return { hash, short, date, author, message }
      })
  } catch {
    // 非 git 仓库 / 无 git 环境时兜底为空数组，保证构建不因此失败
    return []
  }
}

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
    serverBundle: { collections: ['fa6-solid', 'codicon'] },
    // 全站 SSG 的关键：禁止运行时回退到 api.iconify.design
    fallbackToApi: false,
    // 可选：把扫描到的用到的图标打进客户端包，
    // 覆盖"仅在客户端交互时才出现的图标"这种 SSG 盲区
    clientBundle: { scan: true },
  },

  // ？！大肥鱼和 GLM 都强强！？
  nitro: {
    // 把构建期的 git log 结果烘焙为 '#changelog' 虚拟模块，
    // server/api/changelog.get.ts 直接 import，Worker 运行时零外部依赖。
    virtual: {
      '#changelog': `export const changelog = ${JSON.stringify(loadChangelog(200))}`,
    },

    // 把独立 Markdown 文档目录挂载为服务端资源（`assets:markdown`）。
    // 这样 /api/markdown/** 可以直接按路径取文件，新增 .md 无需改动任何代码。
    // 注意 dir 是相对 Nitro 的 srcDir（即项目的 server/ 目录）解析的。
    serverAssets: [{ baseName: 'markdown', dir: '../app/assets/markdown', pattern: '**/*.md' }],

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
      ignore: ['/api/markdown/**', '/api/hitokoto'], // 部分 API 不预渲染，留给 Worker 运行时执行
    },

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
})
