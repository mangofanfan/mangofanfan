<script setup lang="ts">
import { AppMcfppPageAside, AppMcliPageAside } from '#components'
import type { TocLink } from '@nuxt/content'

const route = useRoute()
const aside = () => {
  if (route.path.startsWith('/docs/mcfpp')) {
    return h(AppMcfppPageAside)
  } else if (route.path.startsWith('/docs/mcli')) {
    return h(AppMcliPageAside)
  } else return h('div', 'Unexpected value.')
}

const links = ref<TocLink[]>([])
provide('document-set-toc-links', (tocLinks: TocLink[]) => {
  links.value = tocLinks
})
provide('document-clear-toc-links', () => (links.value = []))
</script>

<template>
  <div class="document-layout">
    <UPage>
      <div class="document-layout-default-slot">
        <slot />
      </div>

      <template #left>
        <component :is="aside" />
      </template>

      <template #right>
        <UPageAside :ui="{ container: 'space-y-4' }">
          <UContentToc highlight highlight-variant="circuit" :links />
        </UPageAside>
      </template>
    </UPage>
  </div>
</template>

<style scoped></style>
