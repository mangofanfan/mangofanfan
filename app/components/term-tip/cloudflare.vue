<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'CloudFlare'
})
const links = [{ name: '官方网站', url: 'https://www.cloudflare.com/zh-cn/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">
        全球最大的互联网基础设施与服务提供商，为个人站长提供免费全球（不含中国大陆） CDN
        加速与防护，以及许多免费服务，因此被称为「大善人」。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
