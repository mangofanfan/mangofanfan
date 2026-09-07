<script setup lang="ts">
definePageMeta({
  layout: 'mcfpp',
})

const route = useRoute()
const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('mcfppVscodeExtension').path(route.path).first()
)

const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings('mcfppVscodeExtension', route.path, {
    fields: ['description'],
  }).order('index', 'ASC')
)
</script>

<template>
  <main class="flex flex-row gap-x-4" v-if="post">
    <article class="article-content flex flex-col gap-y-3 flex-1 min-w-0 shrink overflow-hidden">
      <blog-header :title="post.title" :description="post.description" />
      <ContentRenderer class="flex flex-col gap-y-2" :value="post" />
    </article>
    <aside class="basis-60 flex-0 shrink-0">
      <div class="fixed flex flex-col gap-y-4">
        <blog-toc-card
          class="bg-blur"
          v-if="post.body.toc"
          :title="post.title"
          :links="post.body.toc.links"
        />
        <link-blog-card
          class="max-w-60 bg-blur"
          v-if="surround && surround[0]"
          :to="surround[0].path"
          :title="surround[0].title"
          :content="surround[0].description as string"
        />
        <link-blog-card
          class="max-w-60 bg-blur"
          v-if="surround && surround[1]"
          :to="surround[1].path"
          :title="surround[1].title"
          :content="surround[1].description as string"
        />
      </div>
    </aside>
  </main>
</template>

<style scoped></style>
