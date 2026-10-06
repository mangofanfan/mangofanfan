<script setup lang="ts">
definePageMeta({
  layout: 'blog',
})

const route = useRoute()

const { data: post } = await useAsyncData(`blog-${route.path}`, async () => {
  return queryCollection('blog').path(route.path).where('published', '=', true).first()
})

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('blog', route.path)
    .where('published', '=', true)
    .order('date', 'DESC')
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = post.value.title
const description = post.value.description
// @ts-expect-error 无能为力的类型警告但似乎不影响？
useHead(post.value.head)
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: 'https://mango.js.cn' + post.value.path,
  ogType: 'article',
  ogImageUrl: post.value.image,
  articlePublishedTime: post.value.date,
  articleTag: post.value.tags,
})
</script>

<template>
  <div class="blog-page">
    <UPageHeader :title="post!.title" :description="post!.description" />

    <UPageBody>
      <ContentRenderer :value="post!" />

      <USeparator icon="lucide:book" />

      <UContentSurround :surround />
    </UPageBody>

    <teleport to="#blog-aside-right">
      <UContentToc :links="post!.body.toc!.links" highlight highlight-variant="circuit" />
    </teleport>
  </div>
</template>

<style scoped></style>
