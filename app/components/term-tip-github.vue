<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'GitHub'
})
const links = [{ name: '官方网站', url: 'https://github.com/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">全球最大的公共版本控制系统和代码交流平台。</p>
      <p class="font-misans">或者……全球最大同性交友平台，也没什么问题……</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
