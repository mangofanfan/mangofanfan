<script setup lang="ts">
defineProps<{
  url?: string
}>()
</script>

<template>
  <UCard :ui="{ body: 'flex justify-center items-center' }">
    <template #header>
      <div v-if="url" class="flex flex-row gap-x-3">
        <UInput :model-value="url" disabled class="flex-1" icon="lucide:globe" />
      </div>
    </template>

    <slot />
  </UCard>
</template>

<style scoped></style>
