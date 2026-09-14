<script setup lang="ts"></script>

<template>
  <div class="translate-paragraph flex flex-row divide-x divide-gray-500">
    <div class="tp-origin flex-1 p-1">
      <slot name="o" />
    </div>
    <div class="tp-translation flex-1 p-1">
      <slot name="t" />
    </div>
  </div>
</template>

<style scoped></style>
