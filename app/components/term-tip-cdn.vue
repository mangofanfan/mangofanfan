<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'CDN'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">内容分发网络（Content Delivery Network）。</p>
      <p class="font-misans">
        CDN 通过将网站的静态资源文件缓存到位于不同地区的服务器上，让访客在访问时就近获取，
        提升网站在广大地区的加载速度和访问体验。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
