<script setup lang="ts">
interface Props {
  title: string
  description?: string
  type?:
    | 'website'
    | 'article'
    | 'news' // news 是非规范的类型，目前视作 article 处理
    | 'video.moive'
    | 'video.eposide'
    | 'video.tv_show'
    | 'video.other'
    | 'book'
    | 'profile'
    | 'payment.link'
  siteName?: string
  image?: string
  imageAlt?: string
  // 在 MDC 语法中可能难以指定非字符串类型，在此 hack。
  // 人工书写时应尽量传入 number 以避免歧义
  imageWidth?: number | string
  imageHeight?: number | string

  articleAuthor?: string
  articlePublishedTime?: string
  articleModifiedTime?: string
  articleExpirationTime?: string
  articleSection?: string
  articleTag?: string[]

  video?: string
  videoWidth?: number | string
  videoHeight?: number | string
  // 视频 MIME 类型。对于 text/html 已特殊处理。
  videoType?: string
  videoDuration?: number | string
  videoReleaseDate?: string
  videoActor?: { name: string; role: string }[]
  videoDirector?: string[]
  videoWriter?: string[]
  videoTag?: string[]
  videoSeries?: string

  bookAuthor?: string[]
  bookIsbn?: string
  bookReleaseDate?: string
  bookTag?: string[]
}

withDefaults(defineProps<Props>(), {
  description: '未提供',
  type: 'website',
  siteName: '未提供',
  image: '未提供',
  imageAlt: '未提供',
  imageWidth: 0,
  imageHeight: 0,

  articleAuthor: '未提供',
  articlePublishedTime: '未提供',
  articleModifiedTime: '未提供',
  articleExpirationTime: '未提供',
  articleSection: '未提供',
  articleTag: () => [],

  video: '未提供',
  videoWidth: 0,
  videoHeight: 0,
  videoType: '未提供',
  videoDuration: 0,
  videoReleaseDate: '未提供',
  videoActor: () => [],
  videoDirector: () => [],
  videoWriter: () => [],
  videoTag: () => [],
  videoSeries: '未提供',

  bookAuthor: () => [],
  bookIsbn: '未提供',
  bookReleaseDate: '未提供',
  bookTag: () => [],
})

const play = ref(false)

// 判断一个参数是否提供
function unknown(v: string | number) {
  // hack
  return v === '未提供' || !v
}

// 判断是否为 article。news 并非规范，这里视作 article。
const isArticle = (type: string) => type === 'article' || type === 'news'

// 日期时间格式化
function datetimeFormat(t: string, noDetails: boolean = false) {
  const date = new Date(t)
  return Intl.DateTimeFormat(
    'zh-CN',
    noDetails
      ? { year: 'numeric', month: '2-digit' }
      : {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        },
  ).format(date)
}

// 时长格式化
function durationFormat(dur: number) {
  const second = dur % 60
  const minute = (dur - second) / 60
  const hour = ((dur - second) / 60 - minute) / 60
  if (hour === 0) {
    if (minute === 0) return `${second} 秒`
    return `${minute}:${second}`
  }
  return `${hour}:${minute}:${second}`
}

// 卡片底部小字
const foo = (props: { prefix: string; value: string; datetime?: string }) =>
  h('span', [
    h('span', { class: 'text-muted' }, props.prefix),
    h(
      props.datetime ? 'time' : 'span',
      { class: 'text-secondary', datetime: props.datetime },
      props.value,
    ),
  ])
</script>

<template>
  <div
    :class="[
      'playground-og-card border border-default rounded-2xl shadow-2xl',
      type === 'website' && 'w-[90%] md:w-100 flex flex-col',
      isArticle(type) && 'w-[90%] h-40 flex flex-row',
      type!.startsWith('video') && 'w-[90%] md:w-120 flex flex-col',
      type === 'book' && 'w-[90%] h-100 md:w-160 flex flex-row',
    ]"
  >
    <!-- 主图片块 -->
    <div
      v-if="!unknown(image)"
      :class="[
        isArticle(type) || type === 'book' ? 'rounded-l-2xl' : 'rounded-t-2xl w-full',
        type!.startsWith('video') && 'relative',
      ]"
    >
      <img
        referrerpolicy="no-referrer"
        :src="image"
        :alt="imageAlt"
        :class="[
          isArticle(type) || type === 'book'
            ? 'rounded-l-2xl w-60 h-full object-cover'
            : 'rounded-t-2xl w-full object-cover',
        ]"
      />

      <UBadge
        v-if="!unknown(videoReleaseDate)"
        class="absolute top-2 right-2 cursor-default"
        color="neutral"
      >
        <time :datetime="videoReleaseDate">
          {{ datetimeFormat(videoReleaseDate!) }}
        </time>
      </UBadge>
      <UBadge
        v-if="!unknown(videoDuration)"
        class="absolute bottom-2 right-2 cursor-default"
        color="neutral"
      >
        {{ durationFormat(Number(videoDuration!)) }}
      </UBadge>

      <template v-if="!unknown(video)">
        <template v-if="play">
          <!-- 检测 videoType 并据此决定视频加载方式，例如 B 站传递的是一个 HTML5 播放器 -->
          <video
            v-if="videoType !== 'text/html'"
            class="absolute top-0 left-0 w-full h-full rounded-t-2xl"
            muted
            crossorigin="anonymous"
          >
            <source :src="video" :type="videoType" />
          </video>
          <iframe v-else class="absolute top-0 left-0 w-full h-full rounded-t-2xl" :src="video" />
        </template>
        <UButton class="absolute top-2 left-2 z-2" color="neutral" @click="play = !play">
          {{ play ? '关闭预览' : '播放预览' }}
        </UButton>
      </template>
    </div>

    <!-- 主文字块 -->
    <div
      :class="[
        'w-full p-3 flex flex-col flex-1',
        type === 'book' ? 'justify-center gap-y-4' : 'gap-y-2',
      ]"
    >
      <span class="text-2xl line-clamp-1">{{ title }}</span>
      <span
        v-if="!unknown(description)"
        :class="['text-muted line-clamp-3', isArticle(type) && 'flex-1']"
      >
        {{ description }}
      </span>

      <span class="text-sm flex flex-row gap-x-2 line-clamp-1 text-nowrap whitespace-nowrap">
        <span v-if="!unknown(siteName)" class="text-secondary">
          {{ siteName }}
        </span>

        <span v-if="!unknown(videoSeries)" class="text-warning"> 《{{ videoSeries }}》 </span>

        <template v-if="isArticle(type)">
          <span v-if="articleTag!.length > 0" class="space-x-1.5">
            <span v-for="tag in articleTag" :key="tag" class="underline text-primary">
              {{ tag }}
            </span>
          </span>

          <foo v-if="!unknown(articleAuthor)" prefix="作者" :value="articleAuthor!" />
          <foo
            v-if="!unknown(articlePublishedTime)"
            prefix="发布于"
            :datetime="articlePublishedTime"
            :value="datetimeFormat(articlePublishedTime!)"
          />
          <foo
            v-if="!unknown(articleModifiedTime)"
            prefix="修改于"
            :datetime="articleModifiedTime"
            :value="datetimeFormat(articleModifiedTime!)"
          />
          <foo
            v-if="!unknown(articleExpirationTime)"
            prefix="过期于"
            :datetime="articleExpirationTime"
            :value="datetimeFormat(articleExpirationTime!)"
          />
          <foo v-if="!unknown(articleSection)" prefix="专题" :value="articleSection!" />
        </template>

        <template v-else-if="type!.startsWith('video')">
          <span v-if="videoTag!.length > 0" class="space-x-1.5">
            <span v-for="tag in videoTag" :key="tag" class="underline text-primary">
              {{ tag }}
            </span>
          </span>
        </template>

        <template v-else-if="type === 'book'">
          <span v-if="bookTag!.length > 0" class="space-x-1.5">
            <span v-for="tag in bookTag" :key="tag" class="underline text-primary">
              {{ tag }}
            </span>
          </span>
        </template>
      </span>

      <div v-if="type!.startsWith('video')" class="flex flex-row gap-x-4">
        <!-- video 的专用元数据 -->
        <div v-if="videoActor!.length > 0" class="flex-1 text-sm flex flex-col gap-y-0.5">
          <span
            v-for="actor in videoActor"
            :key="actor.name"
            class="flex flex-row items-center gap-x-1"
          >
            <UIcon name="lucide:circle-user-round" />
            <span class="underline">{{ actor.name }}</span>
            <span class="text-muted">饰</span>
            <span>{{ actor.role }}</span>
          </span>
        </div>

        <div v-if="videoDirector!.length > 0" class="flex flex-col gap-y-0.5 items-center">
          <UIcon class="size-7" name="ant-design:video-camera-outlined" />
          <span class="underline text-sm">{{ videoDirector[0] }}</span>
          <span v-if="videoDirector!.length > 1" class="text-sm text-muted">
            等 {{ videoDirector!.length }} 人
          </span>
        </div>

        <div v-if="videoWriter!.length > 0" class="flex flex-col gap-y-0.5 items-center">
          <UIcon class="size-7" name="lucide:pen-line" />
          <span class="underline text-sm">{{ videoWriter[0] }}</span>
          <span v-if="videoWriter!.length > 1" class="text-sm text-muted">
            等 {{ videoWriter!.length }} 人
          </span>
        </div>
      </div>

      <div v-if="type === 'book'" class="flex flex-col gap-y-1">
        <!-- book 的专用元数据 -->
        <div v-if="bookAuthor!.length > 0" class="flex flex-row gap-x-2">
          <span
            v-for="author in bookAuthor"
            :key="author"
            class="flex flex-row items-center gap-x-1"
          >
            <UIcon name="lucide:pen-line" class="size-6" />
            <span class="underline">{{ author }}</span>
          </span>
        </div>

        <span v-if="!unknown(bookReleaseDate)" class="flex flex-row items-center gap-x-1">
          <UIcon class="size-6" name="lucide:calendar" />
          <time class="text-muted" :datetime="bookReleaseDate">
            {{ datetimeFormat(bookReleaseDate, true) }}
          </time>
        </span>

        <span v-if="!unknown(bookIsbn)" class="flex flex-row items-center gap-x-1">
          <UIcon class="size-6" name="ant-design:scan-outlined" />
          <span class="text-muted">{{ bookIsbn }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
