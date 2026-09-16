<script setup lang="ts"></script>

<template>
  <code
    :class="[
      'inline border border-fuchsia-300 text-fuchsia-600 bg-fuchsia-100/10 rounded-md px-1.5 font-maple-mono',
      'dark:border-yellow-600 dark:bg-fuchsia-900/10 dark:text-yellow-400',
    ]"
  >
    <slot />
  </code>
</template>

<style scoped></style>
