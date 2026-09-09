<script setup lang="ts">
definePageMeta({
  layout: 'mcfpp',
})

const route = useRoute()
const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('mcfpp').path(route.path).first()
)

const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings('mcfpp', route.path, {
    fields: ['description'],
  }).order('index', 'ASC')
)

useSeoMeta({
  title: post.value?.title,
  description: post.value?.description,
})
</script>

<template>
  <main class="flex flex-row gap-x-4" v-if="post">
    <article class="article-content flex flex-col gap-y-3 flex-1 min-w-0 shrink overflow-hidden">
      <blog-header :title="post.title" :description="post.description" />
      <ContentRenderer class="flex flex-col gap-y-2" :value="post" />
    </article>

    <app-sidebar :post :surround />
  </main>
</template>

<style scoped></style>
