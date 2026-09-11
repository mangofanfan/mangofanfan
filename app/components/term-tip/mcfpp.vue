<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'MCFPP'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">
        Minecraft Function Plus Plus，一门为 Minecraft Java 版数据包开发所设计的高级编程语言。
      </p>
      <p class="font-misans">
        在芒果的小站中包含了一些与它有关的文档，请看<prose-a href="/mcfpp">这里</prose-a>！
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
