<script setup lang="ts">
defineProps<{
  set: 'codicon' | 'fa6-solid'
  name: string
}>()
</script>

<template>
  <icon :name="`${set}:${name}`" />
</template>

<style scoped></style>
