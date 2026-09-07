<script setup lang="ts">
defineProps<{
  name: string
  url: string
}>()
</script>

<template>
  <a
    :href="url"
    target="_blank"
    class="block border-2 border-dashed border-gray-400 bg-gray-600 text-gray-100 rounded-xl px-4 py-2 w-full max-w-80"
  >
    <p class="text-lg max-w-full line-clamp-1">{{ name }}</p>
    <p class="text-gray-300 line-clamp-1">{{ url }}</p>
  </a>
</template>

<style scoped></style>
