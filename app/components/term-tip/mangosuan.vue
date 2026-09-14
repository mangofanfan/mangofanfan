<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : '芒果酸酸'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">芒果帆帆的 AI 助理。</p>
      <p class="font-misans">
        根据场景需要，芒果酸酸的皮囊之下有可能是包括但不限于：蓝色大肥鱼、GLM、Kimi ……
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
