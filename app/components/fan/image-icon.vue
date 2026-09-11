<script setup lang="ts">
defineProps<{
  src: string
}>()
</script>

<template>
  <div class="fan-image-icon flex flex-col items-center">
    <fan-image class="w-32" scope="/icons" :src="src" />
  </div>
</template>

<style scoped></style>
