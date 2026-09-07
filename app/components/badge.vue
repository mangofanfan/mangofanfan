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
  <span :class="['border rounded-xl px-2 text-sm', levelClass]">
    <slot />
  </span>
</template>

<style scoped></style>
