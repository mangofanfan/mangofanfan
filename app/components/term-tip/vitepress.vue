<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'VitePress'
})
const links = [{ name: '官方网站', url: 'https://vitepress.dev/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p>由 Vue 驱动的静态站点生成器，默认可以（且流行于）作为文档站点使用。</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
