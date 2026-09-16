<script setup lang="ts">
function toggleTheme() {
  document.body.classList.toggle('dark')
}
</script>

<template>
  <fan-button @click="toggleTheme" class="size-8" level="fan" shape="circle">
    <iconify-icon set="fa6-solid" name="moon" />
  </fan-button>
</template>

<style scoped></style>
