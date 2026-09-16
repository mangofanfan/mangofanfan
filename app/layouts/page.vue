<script setup lang="ts"></script>

<template>
  <div class="page-layout flex flex-col gap-y-6 w-full">
    <header class="sticky top-3 z-10">
      <app-header />
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <app-footer />
    </footer>
  </div>
</template>

<style scoped>
div.page-layout {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 3%;
}
</style>
