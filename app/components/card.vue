<script setup lang="ts">
interface Props {
  extraClass?: string
}

withDefaults(defineProps<Props>(), {
  extraClass: 'px-3 py-2',
})
</script>

<template>
  <div :class="['card border border-fan-600 rounded-lg', extraClass]">
    <slot name="default" />
  </div>
</template>

<style scoped></style>
