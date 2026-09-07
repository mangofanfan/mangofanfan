<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Tailwind CSS'
})
const links = [{ name: '官方网站', url: 'https://tailwindcss.com/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">
        一个十分流行的前端 CSS 框架/处理器，通过约定的类名动态生成 CSS 样式。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
