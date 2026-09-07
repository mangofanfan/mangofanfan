<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Git'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">最主流的版本控制系统，开发用。</p>
      <p class="font-misans">
        Git 通过追踪受其管理的项目文件的每一次变更，配合提交、分支与本地仓库、远程仓库，
        实现去中心化的版本控制，目前已被广泛使用。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
