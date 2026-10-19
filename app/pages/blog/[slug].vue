<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

definePageMeta({
  layout: 'blog',
})

const route = useRoute()

const { data: post } = await useAsyncData(`blog-${route.path}`, async () => {
  return queryCollection('blog').path(route.path).where('published', '=', true).first()
})

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('blog', route.path, { fields: ['description'] })
    .where('published', '=', true)
    .order('date', 'DESC')
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const setTocLinks = inject('set-toc-links') as (links: TocLink[]) => void
setTocLinks(post.value.body.toc?.links ?? [])

const title = post.value.title
const description = post.value.description
// @ts-expect-error 无能为力的类型警告但似乎不影响？
useHead({
  ...post.value.head,
  script: [
    {
      src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
      type: 'text/javascript',
      defer: true,
      key: 'turnstile',
      id: 'turnstile',
    },
  ],
})
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
  <div v-if="post" class="blog-page">
    <UPageHeader
      :title="post.title"
      :description="post.description"
      :links="[
        {
          label: 'Markdown',
          type: 'button',
          color: 'secondary',
          icon: 'ant-design:file-markdown-twotone',
          to: post.path + '.md',
          target: '_blank',
        },
      ]"
    >
      <template #default>
        <div class="flex flex-col gap-y-5">
          <div class="mt-6 flex flex-row gap-x-3 flex-wrap">
            <UBadge
              v-for="tag of post.tags"
              :key="tag"
              color="neutral"
              variant="outline"
              icon="lucide:tag"
              size="lg"
              :label="tag"
            />
          </div>

          <NuxtPicture
            v-if="post.image"
            :src="post.image"
            :img-attrs="{ class: 'rounded-lg' }"
            alt="blog feature image"
          />
        </div>
      </template>
    </UPageHeader>

    <UPageBody>
      <ContentRenderer :value="post" />

      <USeparator icon="lucide:book" />

      <UContentSurround :surround />

      <ClientOnly>
        <app-comment :route="route.path" />
      </ClientOnly>
    </UPageBody>
  </div>
</template>

<style scoped></style>
