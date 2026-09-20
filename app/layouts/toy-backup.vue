<script setup lang="ts">
import type { TocLink } from '@nuxt/content'
import { getOriginMarkdown, getTranslationMarkdown } from '~/assets/script/markdownRe.ts'

const { name, tocLinks } = defineProps<{
  name: string
  tocLinks: TocLink[]
  title: string
  titleId: string
}>()

const { data: ast } = useAsyncData(`backup-${name}`, () => $fetch(`/api/markdown/backup/${name}`))

const { data: raw } = useAsyncData(`backup-${name}-raw`, () =>
  $fetch(`/api/markdown/raw/backup/${name}`)
)

const activeMode = ref<'o' | 'ot' | 't'>('ot')

const showOrigin = computed(() => (activeMode.value !== 't' ? 'block' : 'none'))
const showTranslation = computed(() => (activeMode.value !== 'o' ? 'block' : 'none'))

const trWarning = ref(false)
const copyRawMarkdown = ref('你需要复制本文的 Markdown 格式吗？')
</script>

<template>
  <div class="toy-backup-layout flex flex-col gap-y-6 w-full">
    <header class="sticky top-3 z-10">
      <app-header />
    </header>
    <main>
      <div :class="[`${name}-backup`, 'w-full flex flex-col gap-y-4']">
        <card v-if="ast" class="w-full relative">
          <ContentRenderer :value="ast" :data="ast.data" />

          <div class="sticky bottom-4 w-full flex flex-row gap-x-2 items-center justify-center">
            <translate-switch v-model:active-mode="activeMode" />
            <translate-toc :title :titleId :links="tocLinks" placement="top" />
          </div>
        </card>
        <card v-if="raw" class="w-full flex flex-col gap-y-1">
          <prose-p>如果对你有帮助的话——你可以：</prose-p>
          <div class="flex flex-row gap-x-3">
            <fan-button
              level="fan"
              @click="
                () => {
                  if (raw) copyRawMarkdown = getOriginMarkdown(raw)
                  trWarning = false
                }
              "
            >
              英文原文.markdown
            </fan-button>
            <fan-button
              level="info"
              @click="
                () => {
                  if (raw) copyRawMarkdown = getTranslationMarkdown(raw)
                  trWarning = false
                }
              "
            >
              中文翻译.markdown
            </fan-button>
            <fan-button
              level="warning"
              @click="
                () => {
                  if (raw) copyRawMarkdown = raw
                  trWarning = true
                }
              "
            >
              原文+翻译.markdown
            </fan-button>
          </div>
          <slot />
          <prose-hr />
          <raw-copy-block :text="copyRawMarkdown" :translation-warning="trWarning" />
        </card>
      </div>
    </main>
    <footer>
      <app-footer />
    </footer>
  </div>
</template>

<style scoped></style>

<style>
.tp-origin {
  display: v-bind(showOrigin);
}

.tp-translation {
  display: v-bind(showTranslation);
}
</style>
