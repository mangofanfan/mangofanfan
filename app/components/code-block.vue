<script setup lang="ts">
const props = withDefaults(defineProps<{
  code: string
  lang?: string
  filename?: string
}>(), {
  lang: 'text'
})

// unwrap 之后得到的是 `<code class="shiki">…</code>`（不含外层 pre），
// 交给 ProsePre 的 pre 承载，样式与 Markdown 代码块保持一致
const highlighted = await useHighlightedCode(
  computed(() => props.code),
  { lang: props.lang, unwrap: true }
)
</script>

<template>
  <ProsePre
    :code="code"
    :language="lang"
    :filename="filename"
  >
    <!-- eslint-disable-next-line vue/no-v-html -- 内容是 shiki 生成的受信 HTML -->
    <span v-html="highlighted" />
  </ProsePre>
</template>

<style>
code.shiki span.line {
  display: inline-block;
}
</style>
