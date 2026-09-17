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

/**
 * 已被扩充过组件清单的模板，避免 dev 下反复 generateApp 时把 getContents 层层包裹。
 * 模板对象本身会被 Nuxt 跨次复用，所以用 WeakSet 按对象身份去重即可。
 */
const patchedTemplates = new WeakSet<object>()

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    'nitro-cloudflare-dev',
  ],

  app: {
    head: {
      title: '芒果.js',
      titleTemplate: '%s - mango.js',
      meta: [
        { name: 'color-scheme', content: 'light dark' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '芒果帆帆的全新个人网站喵！' },
        { name: 'keywords', content: '芒果帆帆, MangoFanFan, Nuxt' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  site: {
    name: '芒果.js',
    url: 'https://mango.js.cn/',
  },

  icon: {
    serverBundle: { collections: ['fa6-solid', 'codicon'] },
    // 禁止运行时回退到 api.iconify.design
    fallbackToApi: false,
    // 可选：把扫描到的用到的图标打进客户端包，
    // 覆盖"仅在客户端交互时才出现的图标"这种 SSG 盲区
    clientBundle: { scan: true },
  },

  /*
   * 取消 @nuxt/content 在**生产构建**时对 content 组件的过滤。
   *
   * 背景：`<ContentRenderer>` 不走 Nuxt 的组件自动导入，而是查虚拟模块
   * `#content/components` 里的「组件名 → 动态 loader」映射（见 ContentRenderer.vue
   * 的 resolveVueComponent）。该映射在生成时被过滤：
   *   nuxt.options.dev || manifest.components.includes(c.pascalName) || c.global
   * dev 下无条件收录全部组件；生产下只收录「content 集合（content/**）里出现过」
   * 或「显式 global」的组件。
   *
   * 而 app/assets/markdown/** 是经 nitro.serverAssets + /api/markdown/** 在运行时
   * 下发的独立文档（见下方 serverAssets），不属于任何集合，其中的 `:::xxx` 用到的
   * 组件名永远不会进入 manifest.components。于是构建后这些标签解析失败，被
   * @nuxtjs/mdc 兜底 `resolveComponent(pascalCase(tag))`，最终把裸标签
   * （如 `<HtmlPlayground>`）原样渲染进页面——这就是「dev 正常、build 失效」的原因。
   *
   * 这些文档随时可能用上新组件，逐个往 `content.renderer.alias` 里登记并不现实，
   * 所以这里直接把**所有自动导入组件**的 PascalCase 名补进 manifest.components，
   * 让过滤条件对每个组件都成立。
   *
   * 之所以不用 `components: { global: true }`：那会把全部组件静态注册进入口包；
   * 而只补清单的话，组件仍以动态 loader 形式按需加载，不影响首屏体积。
   *
   * 为什么扩充动作要写在模板 getContents 里面、而不是直接写在 'app:templates' 钩子里：
   * `app.components` 是 Nuxt 内部**同样挂在 'app:templates' 上的钩子**里扫描后赋值的，
   * 而 nuxt.config 的 hooks 在 initNuxt 开头就被注册、会先于它执行，那时 app.components
   * 还是空数组。getContents 则是在所有 'app:templates' 钩子跑完之后才被调用的。
   *
   * 代价是依赖 @nuxt/content 的内部结构（承载同一个 manifest 对象的模板及其
   * options.manifest.components），所以下面在结构变化时显式告警而不是静默退化。
   */
  hooks: {
    'app:templates'(app) {
      // @nuxt/content 把同一个 manifest 对象挂在多个模板的 options 上
      // （content/components.ts、content/manifest.ts 等），这里全部包一层。
      const targets = app.templates.filter((t) => Array.isArray(t.options?.manifest?.components))

      if (!targets.length) {
        // 只有当 @nuxt/content 确实注册了模板、但结构已不认识时才告警，
        // 避免在模块尚未就绪的那次调用里误报。
        if (app.templates.some((t) => t.filename?.startsWith('content/'))) {
          console.warn(
            '[mangofanfan] 未能扩充 @nuxt/content 的组件清单：' +
              '生产构建的组件过滤仍然生效，app/assets/markdown/** 里用到的组件可能被渲染成裸标签。' +
              '请检查 @nuxt/content 版本升级后模板结构是否变化。'
          )
        }
        return
      }

      for (const template of targets) {
        const generate = template.getContents
        if (!generate || patchedTemplates.has(template)) continue
        patchedTemplates.add(template)

        template.getContents = (ctx) => {
          const { components } = ctx.options.manifest
          ctx.options.manifest.components = [
            ...new Set([...components, ...ctx.app.components.map((c) => c.pascalName)]),
          ]
          return generate(ctx)
        }
      }
    },
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
