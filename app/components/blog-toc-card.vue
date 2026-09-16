<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

defineProps<{
  title: string
  links: TocLink[]
}>()

// scroll-spy：滚动时高亮当前章节
const activeIds = reactive<Record<string, boolean>>({})
const lastActiveId = ref<string>()
const observer = ref<IntersectionObserver>()
onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        activeIds[e.target.id] = e.isIntersecting
        lastActiveId.value = e.target.id
      }
    },
    { rootMargin: '-5% 0px -5% 0px' }
  )
  document
    .querySelectorAll('.article-content h2[id], .article-content h3[id]')
    .forEach((el) => observer.value?.observe(el))
})
onBeforeUnmount(() => observer.value?.disconnect())
</script>

<template>
  <card class="blog-toc-card">
    <p class="line-clamp-1"><span class="font-misans font-semibold">目录</span> {{ title }}</p>
    <prose-hr />
    <nav>
      <ul class="flex flex-col">
        <li v-for="link of links" v-bind:key="link.id">
          <a
            class="line-clamp-1"
            :class="['depth', { chosen: activeIds[link.id] || link.id === lastActiveId }]"
            :href="'#' + link.id"
            >{{ link.text }}</a
          >
          <ul v-if="link.children" class="blog-toc-card__second-ul flex flex-col">
            <li v-for="child of link.children" v-bind:key="child.id">
              <a
                class="line-clamp-1"
                :class="[
                  'depth depth-2',
                  { chosen: activeIds[child.id] || child.id === lastActiveId },
                ]"
                :href="'#' + child.id"
                >{{ child.text }}</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </card>
</template>

<style scoped>
a {
  transition-property: color, border-left-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
}

.chosen {
  border-left: 3px solid var(--color-green-400) !important;
  color: var(--color-green-600) !important;
}

.depth {
  font-family: var(--font-misans), sans-serif;
  border-left: 3px solid transparent;
  padding-left: 0.8rem;
  color: var(--color-black);
}

.depth-2 {
  padding-left: 1.6rem;
}
</style>
