<script setup lang="ts">
const { level } = defineProps<{
  level: 'fan' | 'info' | 'warning' | 'danger'
}>()

const iconName = ref('')
const levelClass = ref('')

switch (level) {
  case 'fan':
    iconName.value = 'bell'
    levelClass.value =
      'text-fan-600 bg-fan-100/60 border-fan-600 dark:text-fan-100 dark:bg-fan-800/60 dark:border-fan-300'
    break
  case 'info':
    iconName.value = 'info'
    levelClass.value =
      'text-blue-600 bg-blue-100/60 border-blue-600 dark:text-blue-100 dark:bg-blue-800/60 dark:border-blue-300'
    break
  case 'warning':
    iconName.value = 'exclamation'
    levelClass.value =
      'text-orange-600 bg-orange-100/60 border-orange-600 dark:text-orange-100 dark:border-yellow-400 dark:bg-yellow-900/60'
    break
  case 'danger':
    iconName.value = 'bomb'
    levelClass.value =
      'text-red-600 bg-red-100/60 border-red-600 dark:text-red-100 dark:bg-red-800/60 dark:border-red-300'
    break
}
</script>

<template>
  <div
    :class="[
      'border rounded-lg px-4 py-2 backdrop-blur-md',
      levelClass,
      'flex flex-row gap-x-3 items-center',
    ]"
  >
    <div class="flex-0 basis-6 h-4 flex flex-row items-center justify-center">
      <iconify-icon set="fa6-solid" :name="iconName" size="16px" />
    </div>
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
