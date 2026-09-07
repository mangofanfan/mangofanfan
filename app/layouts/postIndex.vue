<script setup lang="ts">
import AppHeader from '~/components/app-header.vue'
</script>

<template>
  <div class="blog-layout flex flex-col gap-y-6">
    <header class="sticky top-3 z-10">
      <app-header />
    </header>
    <div class="flex flex-row gap-x-3">
      <div class="sidebar-col">
        <NuxtLink to="/">
          <card-button>芒果主页</card-button>
        </NuxtLink>
        <NuxtLink to="/blog">
          <card-button>芒果博客</card-button>
        </NuxtLink>
        <NuxtLink to="/mcfpp">
          <card-button>MCFPP</card-button>
        </NuxtLink>
      </div>
      <div class="main-col">
        <slot />
      </div>
    </div>
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

div.sidebar-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-basis: 240px;
}

div.main-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}
</style>
