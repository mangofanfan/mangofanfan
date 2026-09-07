<script setup lang="ts">
defineProps<{
  to: string
  title: string
  content: string
}>()
</script>

<template>
  <NuxtLink :to="to">
    <card extraClass="px-2 py-4 h-26">
      <p class="font-semibold line-clamp-1">{{ title }}</p>
      <p class="line-clamp-2">{{ content }}</p>
    </card>
  </NuxtLink>
</template>

<style scoped></style>
