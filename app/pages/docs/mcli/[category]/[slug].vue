<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

definePageMeta({
  layout: 'document',
})

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docsMcli').where('published', '=', true).path(route.path).first()
})

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docsMcli', route.path, {
    fields: ['description'],
  })
    .where('published', '=', true)
    .order('index', 'ASC')
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value.title
const description = page.value.description
// @ts-expect-error 无能为力的类型警告但似乎不影响？
useHead(page.value.head)
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: 'https://mango.js.cn' + page.value.path,
  ogType: 'article',
  articlePublishedTime: page.value.publishedDate,
  articleModifiedTime: page.value.modifiedDate,
})

const setTocLinks = inject('document-set-toc-links') as (tocLinks: TocLink[]) => void
setTocLinks(page.value.body.toc!.links)
</script>

<template>
  <div class="mcli-document-page">
    <UPageHeader :title="page!.title" :description="page!.description" />

    <UPageBody>
      <ContentRenderer :value="page!" />

      <USeparator />

      <UContentSurround :surround />
    </UPageBody>
  </div>
</template>

<style scoped></style>
