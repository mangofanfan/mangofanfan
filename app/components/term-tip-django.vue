<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Django'
})
const links = [{ name: '官方网站', url: 'https://www.djangoproject.com/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">
        一个为 Python 设计的 Web 框架，可全面地开发完整网站，在众多 Python Web 框架中最为全面。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
