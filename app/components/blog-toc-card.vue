<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

defineProps<{
  title: string
  links: TocLink[]
}>()

// scroll-spy：滚动时高亮当前章节
const activeId = ref<string>()
const observer = ref<IntersectionObserver>()
onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) activeId.value = e.target.id
      }
    },
    { rootMargin: '0px 0px -80% 0px' } // 视口顶部 20% 区域命中即激活
  )
  // 观察正文中所有带 id 的 h2/h3（选择器按你的容器调整）
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
      <ul class="flex flex-col gap-y-1">
        <li
          :class="['depth', activeId === link.id ? 'chosen font-semibold' : '']"
          v-for="link of links"
          v-bind:key="link.id"
        >
          <a :href="'#' + link.id">{{ link.text }}</a>
          <ul v-if="link.children" class="blog-toc-card__second-ul flex flex-col gap-y-1">
            <li
              :class="['depth', activeId === child.id ? 'chosen font-semibold' : '']"
              v-for="child of link.children"
              v-bind:key="child.id"
            >
              <a :href="'#' + child.id">{{ child.text }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </card>
</template>

<style scoped>
ul.blog-toc-card__second-ul {
  border-left: 2px solid var(--color-gray-200);
}

li.chosen {
  border-left: 4px solid var(--color-green-500) !important;
  padding-left: 7px !important;
}

li.depth {
  border-left: 2px solid transparent;
  padding-left: 3px;
}
</style>
