<script setup lang="ts">
import afdian_icon from '../assets/icons/afd logo-transparent.png'
import bilibili_icon from '../assets/icons/icons8-bilibili-48.png'
import github_icon from '../assets/icons/icons8-github-64.png'
import kofi_icon from '../assets/icons/icons8-ko-fi-48.png'
import zhihu_icon from '../assets/icons/icons8-zhihu-48.png'
</script>

<template>
  <div class="flex flex-row py-1 gap-x-3 md:gap-x-5 overflow-x-auto">
    <social-link-icon
      class="shrink-0"
      text="GitHub"
      :icon="github_icon"
      url="https://github.com/mangofanfan"
    />
    <social-link-icon
      class="shrink-0"
      text="Bilibili"
      :icon="bilibili_icon"
      url="https://space.bilibili.com/354535460"
    />
    <social-link-icon
      class="shrink-0"
      text="知乎"
      :icon="zhihu_icon"
      url="https://www.zhihu.com/people/mang-guo-fan-fan"
    />
    <social-link-icon
      class="shrink-0"
      text="爱发电"
      :icon="afdian_icon"
      url="https://ifdian.net/a/mangofanfan-w"
    />
    <social-link-icon
      class="shrink-0"
      text="ko-fi"
      :icon="kofi_icon"
      url="https://ko-fi.com/mangofanfan"
    />
  </div>
</template>

<style scoped></style>
