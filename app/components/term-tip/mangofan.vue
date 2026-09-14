<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : '芒果帆帆'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">也就是我！</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
