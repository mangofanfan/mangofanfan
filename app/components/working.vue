<script setup lang="ts"></script>

<template>
  <div
    :class="[
      'working border-amber-500 bg-amber-50 border-4 rounded-lg px-4 py-3',
      'hover:border-amber-600 hover:bg-amber-100 transition-transform',
    ]"
  >
    <p class="font-misans text-lg font-bold text-amber-800">施工中</p>
    <p class="font-misans text-amber-600">此部分内容正在施工，需要等待日后补充……</p>
  </div>
</template>

<style scoped>
div.working:hover {
  transform: translateY(-6px);
}
</style>
