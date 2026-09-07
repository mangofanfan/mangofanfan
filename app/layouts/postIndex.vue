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
      <div
        :class="[
          'sidebar-col fixed w-60 sm:w-100 top-22 px-0 flex flex-col gap-y-3 z-90 md:z-0 md:relative md:top-0',
          'transition-all duration-300 ease-in md:opacity-100 md:w-60 md:shrink-0 md:basis-60',
          isAutoMode ? 'opacity-0' : 'opacity-100',
          { 'sidebar-col-hidden': isAutoHidden },
        ]"
      >
        <NuxtLink class="block" to="/">
          <card-button class="bg-blur">芒果主页</card-button>
        </NuxtLink>
        <NuxtLink class="block" to="/blog">
          <card-button class="bg-blur">芒果博客</card-button>
        </NuxtLink>
        <NuxtLink class="block" to="/mcfpp">
          <card-button class="bg-blur">MCFPP</card-button>
        </NuxtLink>
      </div>
      <div class="main-col">
        <slot />
      </div>

      <client-only>
        <teleport to="#home-teleports">
          <fan-button
            level="fan"
            shape="circle"
            class="size-8 md:hidden"
            @click="
              () => {
                // 如果侧栏从关闭到展开的话，先取消 hidden
                if (isAutoMode) isAutoHidden = false
                nextTick(() => (isAutoMode = !isAutoMode))
              }
            "
          >
            <icon name="fa6-solid:house" />
          </fan-button>
        </teleport>
      </client-only>
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
