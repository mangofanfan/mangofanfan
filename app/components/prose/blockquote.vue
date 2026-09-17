<script setup lang="ts"></script>

<template>
  <blockquote
    :class="[
      'border border-gray-600 bg-gray-100/60 text-gray-800 rounded-md px-4 py-2 backdrop-blur-md',
      'dark:border-gray-300 dark:bg-gray-800/60 dark:text-gray-100',
    ]"
  >
    <slot />
  </blockquote>
</template>

<style scoped></style>
