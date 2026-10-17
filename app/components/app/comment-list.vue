<script setup lang="ts">
import { md5 } from 'js-md5'

defineExpose({ reload: onLoad })

const show = ref<'hidden' | 'show' | 'loading'>('hidden')
const comments = ref<
  {
    id: number
    parentId?: number
    name: string
    email: string
    link: string
    content: string
    createdAt: string
  }[]
>([])

const route = useRoute()
async function onLoad() {
  show.value = 'loading'
  comments.value = await $fetch('/api/site/comment', {
    method: 'GET',
    query: { route: route.path },
  })
  show.value = 'show'
}

function buildAvatarUrl(email: string) {
  return `https://cn.cravatar.com/avatar/${md5(email)}.png`
}
function buildTime(time: string) {
  return new Date(time).toLocaleString('zh-CN')
}
</script>

<template>
  <div class="app-comment-list">
    <transition>
      <div
        v-if="show === 'hidden'"
        class="h-50 rounded-xl border border-default bg-muted p-8 cursor-pointer"
        @click="onLoad"
      >
        <span class="text-muted font-sans">点击以加载评论列表</span>
      </div>
    </transition>

    <transition>
      <div v-if="show === 'show'" class="flex flex-col gap-y-3">
        <UEmpty v-if="comments.length === 0" title="无评论" description="你来到了没有留下任何痕迹的荒原……" />

        <div
          v-for="comment of comments"
          :key="comment.id"
          class="border border-default rounded-xl min-h-20 px-4 py-3 flex flex-row gap-x-3"
        >
          <img
            class="rounded-full size-14 object-cover"
            :src="buildAvatarUrl(comment.email)"
            :alt="comment.name + ' 的头像'"
          />

          <div class="space-y-2 flex-1">
            <p class="flex flex-row gap-x-2">
              <span class="text-info font-medium">{{ comment.name }}</span>
              <a v-if="comment.link" class="text-muted" :href="comment.link" target="_blank">{{
                comment.link.replace(/^https?:\/\//, '').replace(/\/*$/, '')
              }}</a>
              <time class="ml-auto text-muted" :datetime="comment.createdAt">{{
                buildTime(comment.createdAt)
              }}</time>
            </p>

            <p>{{ comment.content }}</p>
          </div>
        </div>
      </div>
    </transition>

    <transition>
      <div
        v-if="show === 'loading'"
        class="h-50 rounded-xl border border-default bg-muted flex flex-col justify-center"
      >
        <UProgress inverted />
      </div>
    </transition>
  </div>
</template>

<style scoped></style>
