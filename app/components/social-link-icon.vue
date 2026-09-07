<script setup lang="ts">
defineProps<{
  text: string
  icon: string
  url: string
}>()
</script>

<template>
  <a
    class="flex flex-col items-center px-2 py-2 w-20 border border-gray-500 rounded-md hover:bg-gray-300"
    :href="url"
    target="_blank"
  >
    <img alt="社交媒体图标" :src="icon" class="size-10" />
    <span class="font-misans">{{ text }}</span>
  </a>
</template>

<style scoped></style>
