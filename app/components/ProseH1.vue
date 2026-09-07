<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>

<template>
  <fan-h1 :id="id">
    <slot />
  </fan-h1>
</template>

<style scoped></style>
