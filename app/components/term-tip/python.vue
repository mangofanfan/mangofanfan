<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Python'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">一门面向对象的解释型高级编程语言。</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
