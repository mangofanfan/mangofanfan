/**
 * 解析 app/assets/markdown 下的独立 Markdown 文档。
 *
 * 该目录通过 nuxt.config.ts 的 `nitro.serverAssets` 挂载为 `assets:markdown`，
 * 因此新增 .md 文件后无需改动任何代码，`/api/markdown/<路径>` 立即可用
 * （例如 `app/assets/markdown/license/gpl.md` → `/api/markdown/license/gpl`）。
 *
 * 注意：Markdown 的解析必须留在服务端。
 * `parseMarkdown`（@nuxtjs/mdc）依赖 `unified`，而 `unified` 依赖纯 CJS 的
 * `extend` 包，它在浏览器里无法作为 ESM 加载（会被 Vite 直接按 ESM 处理，
 * 从而报 "does not provide an export named 'default'"）。
 * 所以这里只把解析结果（AST）交给客户端，客户端用 MDCRenderer 渲染。
 */

// 只允许字母、数字、下划线、中划线与路径分隔符，顺带挡掉 ../ 之类的路径穿越
const DOCUMENT_PATH_RE = /^[\w-]+(?:\/[\w-]+)*$/

/** Nuxt 依据 `mdc.highlight` 配置生成的 shiki 高亮器 */
function loadHighlighter() {
  return import('#mdc-highlighter').then((m) => m.default)
}

let highlighter: ReturnType<typeof loadHighlighter> | undefined

/**
 * 为什么必须显式把高亮器交给 rehype 插件：
 * `@nuxtjs/mdc` 的 rehype 高亮插件在服务端默认会去请求 `/api/_mdc/highlight`
 * 拿高亮结果，但 `@nuxt/content` 会把 `mdc.highlight.noApiRoute` 默认设为 true，
 * 从而**不注册**该接口（它只在构建期于 Node 里自行高亮内容库）。
 * 请求失败后插件会静默退化成「不高亮的纯文本」，代码块的 shiki 高亮就会丢失。
 * 传入高亮函数后，高亮在服务端进程内完成，不再依赖任何 HTTP 接口。
 */
function getHighlighter() {
  highlighter ||= loadHighlighter()
  return highlighter
}

export async function parseMarkdownDocument(path: string) {
  if (!DOCUMENT_PATH_RE.test(path)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid markdown document path: ${path}`,
    })
  }

  const source = await useStorage('assets:markdown').getItem<string>(`${path}.md`)

  if (!source) {
    throw createError({
      statusCode: 404,
      statusMessage: `Markdown document not found: ${path}`,
    })
  }

  return await parseMarkdown(source, {
    rehype: {
      plugins: {
        highlight: { options: { highlighter: await getHighlighter() } },
      },
    },
  })
}
