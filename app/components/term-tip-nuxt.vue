<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Nuxt'
})
const links = [{ name: '官方网站', url: 'https://www.nuxt.com/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">一个基于 Vue 实现的全栈 Web 框架，功能丰富强大。</p>
      <p class="font-misans">
        除了 Web 框架外，还提供 NuxtUI 组件库、Nuxt Content 内容管理系统等开源设施。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
