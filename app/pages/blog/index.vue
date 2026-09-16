<script setup lang="ts">
definePageMeta({
  layout: 'post-index',
})

const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

useSeoMeta({
  title: '芒果日志 列表',
  description: '芒果帆帆的日志集合~',
})

function get3(xList: any[]) {
  switch (xList.length) {
    case 0:
    case 1:
    case 2:
    case 3:
      return xList
    default:
      return [xList[0], xList[1], xList[2]]
  }
}
</script>

<template>
  <article v-for="post in posts" :key="post.path">
    <NuxtLink
      class="article-card px-4 py-3 border rounded-lg border-fan-600 flex flex-col gap-y-1 w-full"
      :style="{
        backgroundImage: post.image ? `url('/images/${post.image}')` : '',
        backgroundColor: post.image ? 'var(--article-color-mask)' : 'var(--article-color-bg)',
      }"
      :to="post.path"
    >
      <p class="font-medium text-lg">{{ post.title }}</p>
      <p class="line-clamp-1">{{ post.date }} | {{ post.description }}</p>
      <div class="overflow-x-auto max-w-full flex flex-row gap-x-2">
        <badge class="text-nowrap" level="info" v-for="tag of get3(post.tags)">{{ tag }}</badge>
      </div>
    </NuxtLink>
  </article>
</template>

<style>
.article-card {
  background-position: center;
  background-size: cover;
  background-blend-mode: screen;

  --article-color-light-mask: #8c8c8c;
  --article-color-light-bg: #fff;
  --article-color-dark-mask: #4d4d4d;
  --article-color-dark-bg: #000;

  --article-color-mask: var(--article-color-light-mask);
  --article-color-bg: var(--article-color-light-bg);
}

.dark .article-card {
  background-blend-mode: soft-light;
  --article-color-mask: var(--article-color-dark-mask);
  --article-color-bg: var(--article-color-dark-bg);
}
</style>
