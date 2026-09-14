<script setup lang="ts"></script>

<template>
  <code
    :class="[
      'inline border border-fuchsia-300 bg-fuchsia-50 rounded-md px-1 font-maple-mono',
      'dark:border-yellow-400 dark:bg-gray-900',
    ]"
  >
    <slot />
  </code>
</template>

<style scoped></style>
