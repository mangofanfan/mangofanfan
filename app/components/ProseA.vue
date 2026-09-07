<script setup lang="ts">
const { href } = defineProps<{
  href: string
  rel?: string
}>()

const inner = ref(true)

if (href.startsWith('http://') || href.startsWith('https://')) {
  inner.value = false
}
</script>

<template>
  <NuxtLink class="text-cyan-700 hover:underline hover:text-cyan-950" v-if="inner" :href="href">
    <slot />
  </NuxtLink>
  <a
    class="outer-link text-cyan-700 hover:underline hover:text-cyan-950"
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
