<script setup lang="ts">
const { level, shape } = defineProps<{
  level: 'fan' | 'info' | 'warning' | 'danger'
  shape?: 'circle' | 'square'
}>()

const levelClass = ref('')

switch (level) {
  case 'fan':
    levelClass.value = 'text-fan-600 bg-fan-100 border-fan-600 hover:bg-fan-300 hover:text-fan-800'
    break
  case 'info':
    levelClass.value =
      'text-blue-600 bg-blue-100 border-blue-600 hover:bg-blue-300 hover:text-blue-800'
    break
  case 'warning':
    levelClass.value =
      'text-orange-600 bg-orange-100 border-orange-600 hover:bg-orange-300 hover:text-orange-800'
    break
  case 'danger':
    levelClass.value = 'text-red-600 bg-red-100 border-red-600 hover:bg-red-300 hover:text-red-800'
    break
}

const shapeClass = ref('')

switch (shape) {
  case 'circle':
    shapeClass.value = 'rounded-full'
    break
  case 'square':
    shapeClass.value = 'rounded-md'
    break
}
</script>

<template>
  <button
    :class="[
      'font-misans border flex flex-row items-center justify-center',
      levelClass,
      shapeClass,
    ]"
  >
    <slot />
  </button>
</template>

<style scoped></style>
