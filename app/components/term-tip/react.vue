<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'React'
})
const links = [{ name: '官方网站', url: 'https://react.dev/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">一个在 Web 前端广泛使用的 JavaScript 框架。</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
