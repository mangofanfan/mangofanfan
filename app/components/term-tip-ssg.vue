<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'SSG'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">Static Site Generation，静态站点生成。</p>
      <p class="font-misans">
        网页的构建产物为构建完毕的静态文件，没有需要在访问时再构建内容的步骤。
      </p>
      <p class="font-misans">
        此模式下，服务器压力小（只需托管静态文件），用户浏览器压力也小（只需访问静态文件），但不适合动态内容或更新频繁的场景。
      </p>
      <p class="font-misans">这是 VitePress 的默认部署模式。</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
