<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Typecho'
})
const links = [{ name: '官方网站', url: 'https://typecho.org/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">开源 PHP 博客系统，比 WordPress 更加轻量。</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
