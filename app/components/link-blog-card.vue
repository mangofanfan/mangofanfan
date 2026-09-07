<script setup lang="ts">
const props = defineProps<{
  to: string
  title: string
  content: string
  class: string
}>()
</script>

<template>
  <NuxtLink :to="to">
    <card :class="props.class" extraClass="px-2 py-4 h-26">
      <p class="font-semibold line-clamp-1">{{ title }}</p>
      <p class="line-clamp-2">{{ content }}</p>
    </card>
  </NuxtLink>
</template>

<style scoped></style>
