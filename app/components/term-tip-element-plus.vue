<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Element Plus'
})
const links = [{ name: '官方网站', url: 'https://element-plus.org/zh-CN/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">一个简单、高校的 Vue 3 组件库，事实上比较流行。</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
