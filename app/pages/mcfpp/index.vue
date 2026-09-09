<script setup lang="ts">
definePageMeta({
  layout: 'post-index',
})

const { data: posts } = await useAsyncData('mcfpp-list', () =>
  queryCollection('mcfpp').order('index', 'ASC').all()
)

const { data: postsVscodeExtension } = await useAsyncData('mcfpp-vscode-extension-list', () =>
  queryCollection('mcfppVscodeExtension').order('index', 'ASC').all()
)

useSeoMeta({
  title: 'MCFPP 总览',
  description: '芒果帆帆的 MCFPP 有关内容集合~',
})
</script>

<template>
  <fan-h2>MCFPP</fan-h2>
  <article v-for="post in posts" :key="post.path">
    <NuxtLink
      class="article-card px-4 py-3 border rounded-lg border-fan-600 flex flex-col gap-y-1"
      :to="post.path"
    >
      <p class="font-medium text-lg">{{ post.title }}</p>
      <p class="line-clamp-1">{{ post.description }}</p>
    </NuxtLink>
  </article>

  <prose-hr />
  <fan-h2>VS Code MCFPP 语言支持扩展</fan-h2>
  <article v-for="post in postsVscodeExtension" :key="post.path">
    <NuxtLink
      class="article-card px-4 py-3 border rounded-lg border-fan-600 flex flex-col gap-y-1"
      :to="post.path"
    >
      <p class="font-medium text-lg">{{ post.title }}</p>
      <p class="line-clamp-1">{{ post.description }}</p>
    </NuxtLink>
  </article>
</template>

<style scoped></style>
