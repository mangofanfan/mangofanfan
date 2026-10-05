<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import type { TocLink } from '@nuxt/content'

definePageMeta({
  layout: 'toy',
})

const { data: post } = await useAsyncData('toy-backup-textmate', async () => {
  return await queryCollection('toys').path('/toys/backup/textmate').first()
})

const title = post.value!.title
const description = post.value!.description
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'article',
  ogUrl: 'https://mango.js.cn/toy/backup/textmate',
  ogImage: { url: 'https://mango.js.cn/images/toys/index-textmate.png', type: 'image/png' },
})

const items = ref<TabsItem[]>([
  {
    label: '原文',
    value: 'origin',
  },
  {
    label: '译文',
    value: 'translation',
  },
  {
    label: '同时显示',
    value: 'both',
  },
])

const mode = ref<'origin' | 'translation' | 'both'>('both')
const translationStyle = computed(() => (mode.value !== 'origin' ? 'block' : 'none'))
const originStyle = computed(() => (mode.value !== 'translation' ? 'block' : 'none'))

const links: TocLink[] = [
  {
    text: 'Time Involved',
    id: 'time-involved',
    depth: 2,
  },
  {
    text: 'How Scopes Are Styled',
    id: 'how-scopes-are-styled',
    depth: 2,
    children: [
      {
        text: 'Standard Themes',
        id: 'standard-themes',
        depth: 3,
      },
      {
        text: 'Settings',
        id: 'settings',
        depth: 3,
      },
    ],
  },
  {
    text: 'Standard Scopes',
    id: 'standard-scopes',
    depth: 2,
  },
  {
    text: 'Regular Expressions',
    id: 'regular-expressions',
    depth: 2,
  },
  {
    text: 'Grammar Structure',
    id: 'grammar-structure',
    depth: 2,
    children: [
      {
        text: 'Property List Syntax',
        id: 'property-list-syntax',
        depth: 3,
      },
      {
        text: 'Top Level Structure',
        id: 'top-level-structure',
        depth: 3,
      },
    ],
  },
  {
    text: 'Match Rules',
    id: 'match-rules',
    depth: 2,
    children: [
      {
        text: 'An Include Match Rule',
        id: 'an-include-match-rule',
        depth: 3,
      },
      {
        text: 'A One-Pattern Rule',
        id: 'a-one-pattern-rule',
        depth: 3,
      },
      {
        text: 'A Two-Pattern Rule',
        id: 'a-two-pattern-rule',
        depth: 3,
      },
    ],
  },
  {
    text: 'Developing Your Grammar',
    id: 'developing-your-grammar',
    depth: 2,
  },
]
</script>

<template>
  <UPage>
    <UPageHeader :title :description>
      <div class="w-full flex flex-col items-center pt-6">
        <NuxtImg src="/images/toys/index-textmate.png" class="rounded-lg shadow-2xl max-w-[80%]" />
      </div>
    </UPageHeader>

    <ContentRenderer :value="post!" />

    <teleport to="#site-header-bottom-extra">
      <UTabs
        v-model="mode"
        :items
        :content="false"
        color="neutral"
        :ui="{ root: 'justify-center' }"
      />
    </teleport>

    <template #right>
      <UPageAside>
        <UContentToc highlight highlight-variant="circuit" title="TextMate" :links />
      </UPageAside>
    </template>
  </UPage>
</template>

<!--suppress CssUnusedSymbol -->
<style>
.translate-paragraph > .tp-origin {
  display: v-bind(originStyle);
}

.translate-paragraph > .tp-translation {
  display: v-bind(translationStyle);
}
</style>
