<script setup lang="ts">
const route = useRoute()

const title = ref('芒果帆帆的小站 - 备用标题')

watch(
  () => route.path,
  (newPath) => {
    if (newPath.startsWith('/blog')) title.value = '芒果帆帆的日志'
    else if (newPath.startsWith('/mcfpp')) title.value = '芒果帆帆的 MCFPP 文档'
    else if (newPath.startsWith('/toy')) title.value = '芒果帆帆的玩具妙妙屋'
  },
  { immediate: true }
)
</script>

<template>
  <card class="bg-blur w-full h-14 flex flex-row gap-x-4 items-center" extraClass="px-6 py-2">
    <div id="home-teleports" />
    <span class="font-bold text-xl">{{ title }}</span>
    <NuxtLink to="/" style="margin-left: auto">主页</NuxtLink>
    <NuxtLink to="/blog">博客</NuxtLink>
    <NuxtLink to="/toy">玩具</NuxtLink>
    <div id="header-teleports" />
  </card>
</template>

<style scoped></style>
