<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'README'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">
        自述文件，一般命名为 README.md 或 readme.md ，作为一个仓库、项目等的介绍。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
