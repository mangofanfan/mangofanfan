<script setup lang="ts">
import { watch } from 'vue'

const isAutoMode = ref(true)
const isAutoHidden = ref(false)

watch(isAutoMode, (newVal) => {
  if (newVal) {
    setTimeout(() => (isAutoHidden.value = true), 300)
  } else {
    isAutoHidden.value = false
  }
})
</script>

<template>
  <div class="blog-layout flex flex-col gap-y-6">
    <header class="sticky top-3 z-10">
      <app-header />
    </header>
    <div class="flex flex-row gap-x-3">
      <app-secondbar>
        <NuxtLink class="block" to="/">
          <card-button class="bg-blur">芒果主页</card-button>
        </NuxtLink>
        <NuxtLink class="block" to="/blog">
          <card-button class="bg-blur">芒果博客</card-button>
        </NuxtLink>
        <NuxtLink class="block" to="/mcfpp">
          <card-button class="bg-blur">MCFPP</card-button>
        </NuxtLink>
      </app-secondbar>
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

div.sidebar-col.sidebar-col-hidden {
  display: none;
}

@media screen and (min-width: 768px) {
  div.sidebar-col.sidebar-col-hidden {
    display: block;
  }
}

div.main-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}
</style>
