<script setup lang="ts">
defineProps<{
  images: string[]
  imageClass?: string
}>()
</script>

<template>
  <div class="fan-image-gallery__container">
    <fan-image :class="imageClass" v-for="image of images" v-bind:id="images.indexOf(image)" :src="image" />
  </div>
</template>

<style scoped>
div.fan-image-gallery__container {
  overflow-x: auto;
  
  display: flex;
  flex-direction: row;
  gap: 8px;
}
</style>
