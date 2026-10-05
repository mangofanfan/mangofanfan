<script setup lang="ts">
definePageMeta({
  layout: 'document'
})

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docsMcfppVscodeExtension').where('published', '=', true).path(route.path).first()
})

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docsMcfppVscodeExtension', route.path).where('published', '=', true).order('index', 'ASC')
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value.title
const description = page.value.description
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: 'https://mango.js.cn' + page.value.path,
  ogType: 'article'
})
</script>

<template>
  <UPage>
    <UPageHeader
      :title="page!.title"
      :description="page!.description"
    />

    <UPageBody>
      <ContentRenderer :value="page!" />

      <USeparator />

      <UContentSurround :surround />
    </UPageBody>

    <template #left>
      <AppMcfppPageAside />
    </template>

    <template #right>
      <UPageAside :ui="{ container: 'space-y-4' }">
        <UContentToc
          highlight
          highlight-variant="circuit"
          :links="page!.body.toc!.links"
        />
      </UPageAside>
    </template>
  </UPage>
</template>

<style scoped>

</style>
