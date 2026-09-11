<script setup lang="ts">
defineProps<{
  from?: string
}>()
</script>

<template>
  <div class="px-6 py-2 border border-gray-700 rounded-lg bg-gray-100">
    <slot />
    <div v-if="from">
      <p>{{ from }}</p>
    </div>
  </div>
</template>

<style scoped></style>
