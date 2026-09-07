<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'MediaWiki'
})
const links = [{ name: '官网.org', url: 'https://mediawiki.org/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">使用 PHP 和 MySQL 实现的开源维基内容系统。</p>
      <p class="font-misans">
        属于<strong>维基媒体基金会</strong>，且作为<strong>维基百科</strong>的网站程序。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
