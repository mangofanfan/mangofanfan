<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : '星辰云'
})
const links = [{ name: '官方网站', url: 'https://starxn.com' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">星辰云 STARXN CLOUD 是一个致力于服务广大草根站长的云服务提供商。</p>
      <p class="font-misans">这也是芒果帆帆的网站生涯的起点。</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
