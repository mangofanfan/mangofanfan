<script setup lang="ts">
definePageMeta({
  layout: 'page',
})
</script>

<template>
  <div class="flex flex-col items-center gap-y-2">
    <fan-image src="屏幕截图 2025-11-06 172929.png" />
    <fan-h1>Minecraft 有关开发</fan-h1>
    <fan-quote from="芒果帆帆">其实这才是我最喜欢玩的游戏！</fan-quote>
  </div>

  <div class="flex flex-row items-center justify-center gap-x-4">
    <div class="flex flex-col gap-y-2">
      <fan-h2>概念辨析</fan-h2>
      <p class="text-lg">作为世界上最好玩的游戏！有关技术路线也是大相径庭：</p>
      <ul>
        <li>数据包</li>
        <li>模组</li>
        <li>整合包</li>
      </ul>
    </div>
    <fan-image class="w-full max-w-80" src="屏幕截图 2025-10-18 181738.png" />
  </div>
</template>

<style scoped></style>
