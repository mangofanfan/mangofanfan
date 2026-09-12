<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Unity'
})
const links = [{ name: '官方网站', url: 'https://unity.com/cn' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">
        一个十分流行的、成熟的商业化游戏开发引擎。直接或间接用于原神等大量游戏。
      </p>
      <p class="font-misans">
        主要支持使用 C# 作为脚本语言，可开发 2D 和 3D 的桌面、移动、网页游戏。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
