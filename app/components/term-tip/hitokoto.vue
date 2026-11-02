<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : '一言'
})
const links = [{ name: 'hitokoto.cn', url: 'https://hitokoto.cn/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <prose-blockquote>用代码表达言语的魅力，用代码表达山河的壮丽。</prose-blockquote>
      <p>
        Hitokoto·一言是一个公益性质的开放平台与 API 服务，核心功能是“每次请求，随机返回一句话”。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
