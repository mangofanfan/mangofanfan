<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Visual Studio Market'
})

const links = [{ name: 'Visual Studio Market', url: 'https://marketplace.visualstudio.com/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">
        Visual Studio 市场，包含 Visual Studio 扩展和 Visual Studio Code 扩展等。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
