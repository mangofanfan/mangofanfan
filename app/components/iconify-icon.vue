<script setup lang="ts">
defineProps<{
  set: string
  name: string
  size?: string
}>()
</script>

<template>
  <icon :style="{ fontSize: size ?? '16px' }" :name="`${set}:${name}`" />
</template>

<style scoped></style>
