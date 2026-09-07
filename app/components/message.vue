<script setup lang="ts">
const { level } = defineProps<{
  level: 'fan' | 'info' | 'warning' | 'danger'
}>()

const levelClass = ref('')

switch (level) {
  case 'fan':
    levelClass.value = 'text-fan-600 bg-fan-100 border-fan-600'
    break
  case 'info':
    levelClass.value = 'text-blue-600 bg-blue-100 border-blue-600'
    break
  case 'warning':
    levelClass.value = 'text-orange-600 bg-orange-100 border-orange-600'
    break
  case 'danger':
    levelClass.value = 'text-red-600 bg-red-100 border-red-600'
    break
}
</script>

<template>
  <div :class="['border rounded-lg px-4 py-2', levelClass]">
    <slot />
  </div>
</template>

<style scoped></style>
