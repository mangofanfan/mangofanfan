<script setup lang="ts">
definePageMeta({
  layout: 'toy',
})

useSeoMeta({
  title: '芒果的在线妙妙玩具',
  description: '你也可以来玩，包括许多网页工具。',
})
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <card extraClass="px-4 py-3">
      <prose-p>这里有一些妙妙小玩具！</prose-p>
      <prose-p>所有玩具都是完全于浏览器中工作的，你可以在这里放心玩耍~</prose-p>
    </card>

    <working />

    <card extraClass="px-4 py-3">
      <fan-h3>知识类</fan-h3>
      <prose-hr />
      <div class="flex flex-row gap-x-3">
        <nuxt-link to="/toy/knowledge/license">
          <fan-button level="info">许可证</fan-button>
        </nuxt-link>
      </div>
    </card>

    <card extraClass="px-4 py-3">
      <fan-h3>工程类</fan-h3>
      <prose-hr />
      <div class="flex flex-row gap-x-3">
        <nuxt-link to="/toy/project/nodejs">
          <fan-button level="info">Node.js 项目结构</fan-button>
        </nuxt-link>
      </div>
    </card>
  </div>
</template>

<style scoped></style>
