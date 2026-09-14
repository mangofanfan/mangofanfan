<script setup lang="ts"></script>

<template>
  <li
    :class="[
      'fan-li block bg-cyan-50 hover:bg-cyan-100 border-cyan-600 border px-3 py-0.5 rounded-sm font-misans',
      'dark:bg-cyan-900 hover:dark:bg-cyan-800',
    ]"
  >
    <slot />
  </li>
</template>

<style></style>
