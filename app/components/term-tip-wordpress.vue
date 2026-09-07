<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'WordPress'
})
const links = [
  { name: '官网.org', url: 'https://cn.wordpress.org/' },
  { name: '官网.com', url: 'https://wordpress.com' },
]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">
        使用 PHP 和 MySQL 实现的开源内容管理系统（CMS），拥有庞大的用户社区和丰富的插件、主题资源。
      </p>
      <p class="font-misans">
        官网.org 提供 WordPress 下载和官方插件与主题市场，官网.com 提供商业化建站服务。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
