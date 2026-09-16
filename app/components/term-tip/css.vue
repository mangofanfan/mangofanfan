<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'CSS'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">CSS，译作层叠样式表，传统前端三件套之一。</p>
      <p class="font-misans">
        CSS 的作用是对页面的 HTML 提供样式，毕竟是 <strong>样式表</strong> 嘛。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
