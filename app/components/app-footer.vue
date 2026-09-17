<script setup lang="ts"></script>

<template>
  <div class="app-footer flex flex-col gap-y-2 relative">
    <card class="bg-blur w-full" extraClass="py-3 px-4">
      <prose-p class="text-sm">芒果帆帆不使用 AI 技术来生成此站点的内容。</prose-p>
      <prose-p class="text-sm">本站点是芒果帆帆的个人站点，不与其他任何网站构成从属关系。</prose-p>
    </card>
    <card class="bg-blur w-full">
      <social-links />
    </card>
    <app-bottombar class="app-footer__bottombar bg-white/10 dark:bg-black/10 backdrop-blur-xs" />
  </div>
</template>

<style scoped>
.app-footer {
  margin-top: 16px;
}

.app-footer__bottombar {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
