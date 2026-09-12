<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Godot'
})
const links = [{ name: '官方网站', url: 'https://godotengine.org/zh-cn/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p class="font-misans">
        一个正在流行的开源游戏开发引擎。使用类 Python 的 GDScript 脚本语言，可用于开发 2D 和 3D
        游戏。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
