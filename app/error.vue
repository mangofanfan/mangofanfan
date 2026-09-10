<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{ error: NuxtError }>()

useSeoMeta({
  title: '[ERROR]',
  description: 'Something went wrong. Nobody hurt.',
})

const hito = ref(error.message)
async function loadHito() {
  hito.value = (await useFetch('/api/hitokoto', { method: 'get' }).then(
    (res) => res.data
  )) as string
}
</script>

<template>
  <div class="error px-4 py-3 border-4 border-gray-200 rounded-xl h-fit w-full lg:w-120">
    <fan-h2>ERROR: {{ error.status }}</fan-h2>
    <prose-hr />
    <div class="flex flex-col gap-y-2 h-40 lg:h-48">
      <prose-blockquote style="margin-top: auto">
        <p class="font-maple-mono">{{ hito }}</p>
      </prose-blockquote>
      <div class="flex flex-row gap-x-2">
        <nuxt-link to="/">
          <fan-button shape="square" level="info">返回首页</fan-button>
        </nuxt-link>
        <fan-button @click="loadHito" shape="square" level="warning">喵喵喵喵</fan-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error {
  /* 1. 设置一个非常宽的线性渐变背景 */
  background: linear-gradient(127deg, #ffddbe, #c1ffd9, #bed7ff, #ffbdde);
  /* 2. 把背景尺寸放大，让它超出容器大小 */
  background-size: 400% 400%;
  /* 3. 绑定动画 */
  animation: gradientAnimation 10s ease infinite;
}

/* 4. 定义关键帧，让背景位置动起来 */
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
