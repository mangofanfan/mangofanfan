<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Node.js'
})
const links = [{ name: '官方网站', url: 'https://nodejs.org/en' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">
        一个服务端 JavaScript 运行时，打破了 JavaScript 只能在浏览器运行的现状。
      </p>
      <p class="font-misans">
        此后，JavaScript 开始被用于编写服务端逻辑，到今天已经成为与 Python
        并列的流行且广泛使用的语言。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
