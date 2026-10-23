<script setup lang="ts">
definePageMeta({
  layout: 'blog',
})

const { data: posts } = useAsyncData('blog-posts', async () => {
  return queryCollection('blog').where('published', '=', true).order('date', 'DESC').all()
})

const clearTocLinks = inject('clear-toc-links') as () => void
clearTocLinks()

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
        :to="post.path"
        :title="post.title"
        :description="post.description"
        :date="post.date"
        :image="
          post.image && {
            src: post.image,
            alt: `${post.title} 的特色图像`,
            width: 1600,
            height: 900,
            densities: '1x 2x',
            sizes: 'sm:100vw md:768px',
            format: 'auto',
          }
        "
        variant="soft"
      />
    </UBlogPosts>
  </UPageBody>
</template>

<style scoped></style>
