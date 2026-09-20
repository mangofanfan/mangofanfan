<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : '内容管理系统'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">
        内容管理系统（CMS）是一种无需编写代码即可创建、管理、存储和发布数字内容的软件平台。
      </p>
      <p class="font-misans">例如 WordPress 就是非常流行的开源个人博客 CMS。</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
