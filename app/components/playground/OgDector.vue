<script setup lang="ts">
import OgCard from '~/components/playground/OgCard.vue'

interface scheme {
  target: string
  raw: string
}

let htmlParser: { parse: (arg: string) => OgCardProps } | null = null

const success = ref(false)
const loading = ref(false)

const toast = useToast()
const raw = ref('')
const url = ref('')
const props = ref<Partial<OgCardProps>>({})

function onSubmit() {
  loading.value = true
  success.value = false

  $fetch('/api/og/fetch-og', { method: 'POST', body: { url: url.value } })
    .then((res) => {
      raw.value = (res as scheme).raw
      success.value = true
      props.value = (htmlParser as { parse: (arg: string) => OgCardProps }).parse(raw.value)
    })
    .catch((err) => {
      toast.add({
        color: 'error',
        title: '后端抓取错误：' + String(err),
      })
      success.value = false
    })
    .finally(() => (loading.value = false))
}

onMounted(() => {
  htmlParser = useHtmlParser()
})

const imageFallbackUrl = computed<string>(() =>
  props.value
    ? `/api/og/fetch-img?origin=${encodeURI(props.value.url!)}&url=${encodeURI(props.value.image!)}`
    : '',
)
</script>

<template>
  <UCard>
    <template #header>
      <div class="w-full flex flex-row gap-x-2">
        <UInput
          v-model="url"
          type="url"
          class="flex-1"
          icon="lucide:globe"
          placeholder="https://..."
        />
        <UButton class="flex-0" @click="onSubmit()">
          <UIcon name="lucide:search-code" />
        </UButton>
      </div>
    </template>

    <template #default>
      <div class="w-full h-fit flex items-center justify-center">
        <UProgress v-if="loading" orientation="horizontal" class="w-full" inverted />
        <div v-else-if="!success" class="w-[90%] h-[80%] bg-gray-500/60 rounded-lg" />
        <og-card
          v-else
          :title="props.title ?? '未命名页面'"
          :description="props.description"
          :type="props.type"
          :site-name="props.siteName"
          :url="props.url"
          :image="props.image"
          :image-alt="props.imageAlt"
          :image-height="props.imageHeight"
          :image-width="props.imageWidth"
          :article-author="props.articleAuthor"
          :article-published-time="props.articlePublishedTime"
          :article-modified-time="props.articleModifiedTime"
          :article-expiration-time="props.articleExpirationTime"
          :article-section="props.articleSection"
          :article-tag="props.articleTag"
          :video="props.video"
          :video-width="props.videoWidth"
          :video-height="props.videoHeight"
          :video-type="props.videoType"
          :video-actor="props.videoActor"
          :video-writer="props.videoWriter"
          :video-director="props.videoDirector"
          :video-duration="props.videoDuration"
          :video-release-date="props.videoReleaseDate"
          :video-series="props.videoSeries"
          :video-tag="props.videoTag"
          :book-author="props.bookAuthor"
          :book-isbn="props.bookIsbn"
          :book-release-date="props.bookReleaseDate"
          :book-tag="props.bookTag"
          :image-fallback="imageFallbackUrl"
        />
      </div>
    </template>

    <template #footer>
      <UAccordion
        :items="[
          {
            label: success ? '查看抓取结果（HTML）' : '暂无抓取结果',
            value: 'html',
            slot: 'html' as const,
          },
        ]"
        :unmount-on-hide="false"
      >
        <template #html="">
          <CodeBlock :code="raw" lang="html" />
        </template>
      </UAccordion>
    </template>
  </UCard>
</template>

<style scoped></style>
