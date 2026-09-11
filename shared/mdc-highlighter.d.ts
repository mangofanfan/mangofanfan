/**
 * `#mdc-highlighter` 是 @nuxtjs/mdc 在构建期生成的虚拟模块
 * （`.nuxt/mdc-highlighter.mjs`，即项目 `mdc.highlight` 配置对应的 shiki 实例）。
 *
 * 这里手写一份声明，原因是从 `@nuxtjs/mdc` 根路径取不到类型：
 * 它的 `exports["."]` 没有 types 条件，而 `typesVersions` 又指向不存在的
 * `dist/index.d.mts`，于是 `import type { Highlighter } from '@nuxtjs/mdc'` 会报 TS2307。
 * 声明内容与 @nuxtjs/mdc 的 Highlighter / HighlightResult 保持一致。
 */
declare module '#mdc-highlighter' {
  export type MdcThemeOptions = string | Record<string, string>

  export interface MdcHighlighterOptions {
    highlights?: number[]
    meta?: string
  }

  export interface MdcHighlightResult {
    tree: unknown[]
    className?: string
    style?: string
    inlineStyle?: string
  }

  export type MdcHighlighter = (
    code: string,
    language: string,
    theme: MdcThemeOptions,
    options: Partial<MdcHighlighterOptions>
  ) => Promise<MdcHighlightResult>

  const highlighter: MdcHighlighter
  export default highlighter
}
