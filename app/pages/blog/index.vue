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
</script>

<template>
  <article v-for="post in posts" :key="post.path">
    <NuxtLink
      class="article-card px-4 py-3 border rounded-lg border-fan-600 flex flex-col gap-y-1"
      :style="{
        backgroundImage: post.image ? `url('/images/${post.image}')` : '',
        backgroundColor: post.image ? '#8c8c8c' : '#ffffff',
      }"
      :to="post.path"
    >
      <p class="font-medium text-lg">{{ post.title }}</p>
      <p class="line-clamp-1">{{ post.date }} | {{ post.description }}</p>
      <div class="flex flex-row gap-x-2">
        <badge level="info" v-for="tag of post.tags">{{ tag }}</badge>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.article-card {
  background-position: center;
  background-size: cover;
  background-blend-mode: screen;
}
</style>
