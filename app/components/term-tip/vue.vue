<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Vue'
})
const links = [{ name: '官方网站', url: 'https://cn.vuejs.org/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">一个在 Web 前端广泛使用的渐进式 JavaScript 框架。</p>
      <p class="font-misans">Vue 的作者尤雨溪也是江苏人哦！（？</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
