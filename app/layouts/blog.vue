<script setup lang="ts">
import AppHeader from '~/components/app-header.vue'
</script>

<template>
  <div class="blog-layout flex flex-col gap-y-6 w-full">
    <header class="sticky top-3 z-10">
      <app-header />
    </header>
    <app-secondbar>
      <div class="sidebar-col">
        <NuxtLink to="/blog">
          <card-button>博客列表</card-button>
        </NuxtLink>
      </div>
      <div class="main-col">
        <slot />
      </div>
    </app-secondbar>
    <footer>
      <app-footer />
    </footer>
  </div>
</template>

<style scoped>
div.blog-layout {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 4%;
}

div.main-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-width: 0;
}
</style>
