<script setup lang="ts">
const { image } = defineProps<{
  image?: string
  title: string
  description: string
  tags?: string[]
}>()

const imageUrl = computed(() => {
  return image ? `url("/images/${image}")` : ''
})
const height = computed(() => {
  return image ? '300px' : 'fit-content'
})
</script>

<template>
  <div class="blog-header__container">
    <div class="flex flex-row gap-x-2" v-if="tags">
      <badge v-for="tag of tags" level="info">{{ tag }}</badge>
    </div>
    <div class="blog-header__inner-card">
      <fan-h1>{{ title }}</fan-h1>
    </div>
  </div>
</template>

<style scoped>
div.blog-header__container {
  width: 100%;
  height: v-bind(height);
  border-radius: 12px;
  border: 1px solid var(--color-gray-600);
  background-color: aliceblue;
  background-image: v-bind(imageUrl);
  background-size: cover;
  background-position: center;
  padding: 0.4rem 0.6rem;

  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
}

div.blog-header__inner-card {
  border: 1px solid rgb(240 255 255 / 0.35);
  border-radius: 8px;
  background-color: rgb(229 255 255 / 0.6);
  backdrop-filter: blur(8px);
  padding: 1em 1.4em;
}
</style>
