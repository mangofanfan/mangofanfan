<script setup lang="ts">
defineProps<{
  set: string
  name: string
}>()
</script>

<template>
  <icon :name="`${set}:${name}`" />
</template>

<style scoped></style>
