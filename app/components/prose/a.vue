<script setup lang="ts">
const { href } = defineProps<{
  href: string
  rel?: string
}>()

const inner = ref(true)

if (href.startsWith('http://') || href.startsWith('https://')) {
  inner.value = false
}

// 判断当前链接是否指向当前页面
// 并为指向自身的链接取消链接效果、添加类 MediaWiki 风格的加粗
const route = useRoute()
const self = computed(() => inner.value && route.path === href)
</script>

<template>
  <span v-if="self" class="font-misans text-black font-medium">
    <slot />
  </span>
  <NuxtLink
    class="font-misans text-cyan-700 hover:underline hover:text-cyan-950"
    v-else-if="inner"
    :href="href"
  >
    <slot />
  </NuxtLink>
  <a
    class="outer-link font-misans text-cyan-700 hover:underline hover:text-cyan-950"
    v-else
    :href="href"
    :rel="rel ? rel : 'nofollow'"
    target="_blank"
  >
    <slot />
  </a>
</template>

<style scoped>
a.outer-link:before {
  content: '外部';
  display: inline;
  padding: 0 4px;
  margin-right: 4px;
  border: 1px solid var(--color-cyan-600);
  border-radius: 6px;
  background-color: var(--color-cyan-100);
}
</style>
