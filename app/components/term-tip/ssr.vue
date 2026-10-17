<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'SSR'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p>Server Side Render，服务端渲染。</p>
      <p>在用户访问网站时，在服务端渲染完毕用户将要访问的页面，将渲染好的页面发送给用户。</p>
      <p>
        此模式下，服务器压力较大，但相比单页应用程序（SPA）拥有更佳的首屏加载速度和 SEO。PHP
        就是典型的服务端渲染理念得到的编程语言。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
