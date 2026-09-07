<script setup lang="ts"></script>

<template>
  <div class="blog-layout flex flex-col gap-y-6 w-full">
    <header class="sticky top-3 z-10">
      <app-header />
    </header>
    <div class="flex flex-row gap-x-3">
      <div class="sidebar-col">
        <NuxtLink to="/mcfpp">
          <card-button class="bg-blur">MCFPP 文档列表</card-button>
        </NuxtLink>
        <div class="sticky top-22 flex flex-col gap-y-3">
          <card class="bg-blur">
            <p class="font-misans font-semibold">参考链接</p>
            <prose-hr />
            <prose-a class="block" href="https://zh.minecraft.wiki/">中文 Minecraft Wiki</prose-a>
            <prose-a class="block" href="https://www.mcfpp.top/zh/">MCFPP API</prose-a>
            <prose-a class="block" href="https://liiked.github.io/VS-Code-Extension-Doc-ZH/"
              >VS Code 扩展开发指南（中文）</prose-a
            >
          </card>
          <sidebar-card-nav-mcfpp class="bg-blur" />
        </div>
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
  flex-shrink: 0;
}

div.main-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-width: 0;
}
</style>
