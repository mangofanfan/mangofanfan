<script setup lang="ts">
definePageMeta({
  layout: 'blog',
})

const { data: posts } = useAsyncData('blog-posts', async () => {
  return queryCollection('blog').where('published', '=', true).order('date', 'DESC').all()
})

const title = '芒果日志中心页'
const description = '芒果帆帆的博客的中心索引页'
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://mango.js.cn/blog',
})
</script>

<template>
  <UPageBody>
    <UBlogPosts orientation="vertical" :ui="{ base: 'gap-y-4 lg:gap-y-6' }">
      <UBlogPost
        v-for="post of posts"
        :key="post.path"
        v-bind="post"
        :to="post.path"
        variant="soft"
      />
    </UBlogPosts>
  </UPageBody>
</template>

<style scoped></style>
