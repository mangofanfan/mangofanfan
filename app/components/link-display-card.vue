<script setup lang="ts">
defineProps<{
  to: string
  title: string
  content: string
}>()
</script>

<template>
  <NuxtLink :to="to">
    <card>
      <p class="text-lg font-semibold">{{ title }}</p>
      <p>{{ content }}</p>
    </card>
  </NuxtLink>
</template>

<style scoped></style>
