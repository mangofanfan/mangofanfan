<script setup lang="ts">
definePageMeta({
  layout: 'post-index',
})

const { data: posts } = await useAsyncData('nuxt-log-list', () =>
  queryCollection('nuxtLog').order('date', 'DESC').all()
)

useSeoMeta({
  title: '芒果.js 开发日志',
  description: '芒果帆帆新 Nuxt 网站的日志集合~',
})
</script>

<template>
  <article v-for="post in posts" :key="post.path">
    <NuxtLink
      class="article-card px-4 py-3 border rounded-lg border-fan-600 flex flex-col gap-y-1"
      :to="post.path"
    >
      <p class="font-medium text-lg">{{ post.title }}</p>
      <p class="line-clamp-1">{{ post.date }} | {{ post.description }}</p>
    </NuxtLink>
  </article>
</template>

<style scoped></style>
