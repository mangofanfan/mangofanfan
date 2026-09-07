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
  <div class="blog-layout flex flex-col gap-y-6 w-full">
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
        <NuxtLink class="block" to="/mcfpp">
          <card-button class="bg-blur">MCFPP 文档列表</card-button>
        </NuxtLink>
        <div class="sticky top-22 flex flex-col gap-y-3">
          <card class="bg-blur">
            <p class="font-misans font-semibold">参考链接</p>
            <prose-hr />
            <prose-a class="block" href="https://zh.minecraft.wiki/">中文 Minecraft Wiki</prose-a>
            <prose-a class="block" href="https://vanillalibrary.mcfpp.top/datapack-index/"
              >香草图书馆</prose-a
            >
            <prose-a class="block" href="https://www.mcfpp.top/zh/">MCFPP API</prose-a>
            <prose-a class="block" href="https://liiked.github.io/VS-Code-Extension-Doc-ZH/"
              >VS Code 扩展开发指南（中文）</prose-a
            >
          </card>
          <sidebar-card-nav-mcfpp class="bg-blur" />
        </div>
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
  min-width: 0;
}
</style>
