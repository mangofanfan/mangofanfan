<script setup lang="ts">
import { watch } from 'vue'

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

const isAsideCollapsed = ref(false)
const isAsideHidden = ref(false)

watch(isAsideCollapsed, (newVal) => {
  if (newVal) {
    setTimeout(() => (isAsideHidden.value = true), 300)
  } else {
    isAsideHidden.value = false
  }
})
</script>

<template>
  <main class="lg:flex lg:flex-row lg:gap-x-4" v-if="post">
    <article
      class="article-content flex flex-col gap-y-3 lg:flex-1 min-w-0 lg:shrink overflow-hidden"
    >
      <blog-header :title="post.title" :description="post.description" />
      <ContentRenderer class="flex flex-col gap-y-2" :value="post" />
    </article>
    <aside
      :class="[
        'max-w-full fixed top-22 right-8 lg:flex-0 lg:top-0 lg:right-0 lg:relative',
        'transition-all duration-300 ease-in',
        isAsideCollapsed
          ? 'w-0 lg:shrink lg:basis-60 opacity-0'
          : 'w-60 md:w-100 lg:shrink-0 lg:basis-60 opacity-100',
        { hidden: isAsideHidden },
      ]"
    >
      <div class="flex flex-col gap-y-4 lg:sticky lg:top-22">
        <blog-toc-card
          class="max-w-100 lg:max-w-60 bg-blur"
          v-if="post.body.toc"
          :title="post.title"
          :links="post.body.toc.links"
        />
        <link-blog-card
          class="max-w-100 lg:max-w-60 bg-blur"
          v-if="surround && surround[0]"
          :to="surround[0].path"
          :title="surround[0].title"
          :content="surround[0].description as string"
        />
        <link-blog-card
          class="max-w-100 lg:max-w-60 bg-blur"
          v-if="surround && surround[1]"
          :to="surround[1].path"
          :title="surround[1].title"
          :content="surround[1].description as string"
        />
      </div>
    </aside>

    <client-only>
      <teleport to="#header-teleports">
        <fan-button
          level="fan"
          shape="circle"
          class="size-8"
          @click="
            () => {
              // 如果侧栏从关闭到展开的话，先取消 hidden
              if (isAsideCollapsed) isAsideHidden = false
              nextTick(() => (isAsideCollapsed = !isAsideCollapsed))
            }
          "
        >
          <icon name="fa6-solid:ellipsis" />
        </fan-button>
      </teleport>
    </client-only>
  </main>
</template>

<style scoped></style>
