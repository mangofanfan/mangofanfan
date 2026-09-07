<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>

<template>
  <fan-h2 :id="id">
    <slot />
  </fan-h2>
</template>

<style scoped></style>
