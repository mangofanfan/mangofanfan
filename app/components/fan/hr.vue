<script setup lang="ts">
interface Props {
  direction?: 'vertical' | 'horizontal'
}

withDefaults(defineProps<Props>(), { direction: 'vertical' })
</script>

<template>
  <hr :class="direction" />
</template>

<style scoped>
hr.vertical {
  height: 1px;
  border: none;
  border-top: 1px dashed var(--color-gray-600);
  margin: 12px 0;
}

hr.horizontal {
  width: 1px;
  height: 100%;
  border: none;
  border-left: 1px dashed var(--color-gray-600);
  margin: 0 12px;
}
</style>
