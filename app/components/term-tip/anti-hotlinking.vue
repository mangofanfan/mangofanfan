<script setup lang="ts">
const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : '防盗链'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p>
        防盗链是指通过技术手段，防止第三方未经授权的网站直接引用、加载或下载本站的图片、视频、音频、压缩包等静态或动态资源，从而保护服务器带宽、降低经济损失和资源消耗的技术。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
