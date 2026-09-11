<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>

<template>
  <fan-h4 :id="id">
    <slot />
  </fan-h4>
</template>

<style scoped></style>
