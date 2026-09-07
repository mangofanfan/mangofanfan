<script setup lang="ts">
defineProps<{
  src: string
  alt: string
}>()
</script>

<template>
  <img class="rounded-full border border-fan-600" :src="src" :alt="alt" />
</template>

<style scoped></style>
