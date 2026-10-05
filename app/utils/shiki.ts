import mcfppGrammar from '../../public/langs/mcfpp.tmLanguage.json'
import mcfunctionGrammar from '../../public/langs/mcfunction.tmLanguage.json'

// 自定义的 TextMate 语法。shiki 以语法里的 `name` 作为语言 id，而 nuxt-shiki /
// @nuxtjs/mdc 都会用小写的语言名去查找，所以这里把 id 统一成小写的 `mcfpp`。
const EXTRA_LANGS = [
  { ...mcfppGrammar, name: 'mcfpp' },
  { ...mcfunctionGrammar, name: 'mcfunction' }
]

let extraLangsPromise: Promise<void> | undefined

/**
 * 把额外语言注册进 nuxt-shiki 的 highlighter 实例（只会执行一次）。
 */
function loadExtraLangs() {
  extraLangsPromise ||= (async () => {
    const highlighter = await getShikiHighlighter()
    const loadedLangs = highlighter.getLoadedLanguages()

    await Promise.all(
      EXTRA_LANGS
        .filter(lang => !loadedLangs.includes(lang.name))
        .map(lang => highlighter.loadLanguage(lang as never))
    )
  })()

  return extraLangsPromise
}

/**
 * 在组件里高亮一段代码，返回可直接用于 `v-html` 的 HTML 字符串。
 *
 * 与 Nuxt Content 的 Markdown 代码块共用 nuxt-shiki 的同一份配置
 * （同一组明暗主题、同样的 `--shiki-light` / `--shiki-dark` CSS 变量）。
 *
 * Nuxt Content 内部的 highlighter 是构建期的私有实例，无法在运行时拿到，
 * 所以这里复用的是 nuxt-shiki 的实例。
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * const html = await useHighlightedCode(() => code, { lang: 'mcfpp', unwrap: true })
 * </script>
 * <template><pre v-html="html" /></template>
 * ```
 */
export async function useHighlightedCode(
  code: string | undefined | Ref<string | undefined>,
  options: Parameters<typeof useShikiHighlighted>[1] = {}
) {
  await loadExtraLangs()

  return useShikiHighlighted(code, options)
}
