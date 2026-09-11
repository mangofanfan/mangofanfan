<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Linux'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">简单来说，是世界上各种意义上使用最为广泛的操作系统，开源。</p>
      <p class="font-misans">
        Linux 的创始人为 Linus（林纳斯）。现在，Linux 是一个庞大社区的合作项目。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
