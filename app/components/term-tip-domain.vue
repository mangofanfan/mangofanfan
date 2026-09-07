<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : '域名'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">
        互联网上用于识别和定位计算机或网站的文字代称，用来代替复杂的数字IP地址。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
