<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Nitro'
})
const links = [{ name: '官方网站', url: 'https://nitro.zhcndoc.com/docs' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">
        一个由 Nuxt 团队维护的全栈服务器框架，兼容任何运行环境和任何部署目标。
      </p>
      <p class="font-misans">
        Nitro 同时作为 Vite 插件，可为应用提供路由和服务端渲染等功能，开箱即用。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
