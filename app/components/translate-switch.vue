<script setup lang="ts">
const activeMode = defineModel<'o' | 'ot' | 't'>('activeMode', { required: true })
</script>

<template>
  <div
    :class="[
      'translate-switch w-90 h-10 rounded-md flex flex-row items-center gap-x-1 px-1',
      'border border-green-300 bg-green-50',
      'dark:border-green-600 dark:bg-green-900',
    ]"
  >
    <div
      :class="[
        'size-8 rounded-md border flex items-center justify-center',
        'bg-green-200 border-green-700',
      ]"
    >
      <iconify-icon class="text-green-700" set="fa6-solid" name="language" />
    </div>
    <button
      :class="['translate-switch-button h-9', { active: activeMode === 'o' }]"
      @click="activeMode = 'o'"
    >
      只原文
    </button>
    <button
      :class="['translate-switch-button h-9', { active: activeMode === 'ot' }]"
      @click="activeMode = 'ot'"
    >
      同时显示
    </button>
    <button
      :class="['translate-switch-button h-9', { active: activeMode === 't' }]"
      @click="activeMode = 't'"
    >
      只翻译
    </button>
  </div>
</template>

<style scoped>
button.translate-switch-button {
  flex: 1;
  font-family: var(--font-misans), sans-serif;
  cursor: pointer;
  padding: 2px 12px;
  background-color: var(--color-green-50);
  border-radius: var(--radius-md);
}

button.translate-switch-button.active {
  border: 2px solid var(--color-green-200);
  background-color: var(--color-green-500);
  color: var(--color-white);
}

.dark button.translate-switch-button {
  background-color: var(--color-green-900);
}

.dark button.translate-switch-button.active {
  border: 2px solid var(--color-green-700);
  background-color: var(--color-green-400);
  color: var(--color-black);
}
</style>
