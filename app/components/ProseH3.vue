<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>

<template>
  <fan-h3 :id="id">
    <slot />
  </fan-h3>
</template>

<style scoped></style>
