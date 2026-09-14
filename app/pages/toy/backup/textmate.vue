<script setup lang="ts">
import type { TocLink } from '@nuxt/content'
import TranslateToc from '~/components/translate-toc.vue'
import { getOriginMarkdown, getTranslationMarkdown } from '~/assets/script/markdownRe.ts'

definePageMeta({
  layout: 'toy',
})

useSeoMeta({
  title: '编写 TextMate 语法：一些需要学习的课程（翻译）',
  description:
    'Dr.Matt Neuburg 的技术博客 Writing a TextMate Grammar: Some Lessons Learned 的非官方中文翻译。',
})

const { data: textmate_ast } = useAsyncData('backup-textmate', () =>
  $fetch('/api/markdown/backup/textmate')
)

const { data: textmate_raw } = useAsyncData('backup-textmate-raw', () =>
  $fetch('/api/markdown/raw/backup/textmate')
)

const activeMode = ref<'o' | 'ot' | 't'>('ot')

const showOrigin = computed(() => (activeMode.value !== 't' ? 'block' : 'none'))
const showTranslation = computed(() => (activeMode.value !== 'o' ? 'block' : 'none'))

const tocOrigin: TocLink[] = [
  {
    text: 'Time Involved',
    id: 'time-involved',
    depth: 2,
  },
  {
    text: 'How Scopes Are Styled',
    id: 'how-scopes-are-styled',
    depth: 2,
    children: [
      {
        text: 'Standard Themes',
        id: 'standard-themes',
        depth: 3,
      },
      {
        text: 'Settings',
        id: 'settings',
        depth: 3,
      },
    ],
  },
  {
    text: 'Standard Scopes',
    id: 'standard-scopes',
    depth: 2,
  },
  {
    text: 'Regular Expressions',
    id: 'regular-expressions',
    depth: 2,
  },
  {
    text: 'Grammar Structure',
    id: 'grammar-structure',
    depth: 2,
    children: [
      {
        text: 'Property List Syntax',
        id: 'property-list-syntax',
        depth: 3,
      },
      {
        text: 'Top Level Structure',
        id: 'top-level-structure',
        depth: 3,
      },
    ],
  },
  {
    text: 'Match Rules',
    id: 'match-rules',
    depth: 2,
    children: [
      {
        text: 'An Include Match Rule',
        id: 'an-include-match-rule',
        depth: 3,
      },
      {
        text: 'A One-Pattern Rule',
        id: 'a-one-pattern-rule',
        depth: 3,
      },
      {
        text: 'A Two-Pattern Rule',
        id: 'a-two-pattern-rule',
        depth: 3,
      },
    ],
  },
  {
    text: 'Developing Your Grammar',
    id: 'developing-your-grammar',
    depth: 2,
  },
]

const trWarning = ref(false)
const copyRawMarkdown = ref('你需要复制本文的 Markdown 格式吗？')
</script>

<template>
  <div class="textmate-backup w-full flex flex-col gap-y-4">
    <card v-if="textmate_ast" class="w-full relative">
      <ContentRenderer :value="textmate_ast" :data="textmate_ast.data" />

      <div class="sticky bottom-4 w-full flex flex-row gap-x-2 items-center justify-center">
        <translate-switch v-model:active-mode="activeMode" />
        <translate-toc
          title="Writing a TextMate Grammar: Some Lessons Learned"
          titleId="writing-a-textmate-grammar-some-lessons-learned"
          :links="tocOrigin"
          placement="top"
        />
      </div>
    </card>
    <card v-if="textmate_raw" class="w-full flex flex-col gap-y-1">
      <prose-p>如果对你有帮助的话——你可以：</prose-p>
      <div class="flex flex-row gap-x-3">
        <fan-button
          level="fan"
          @click="
            () => {
              copyRawMarkdown = getOriginMarkdown(textmate_raw)
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
              copyRawMarkdown = getTranslationMarkdown(textmate_raw)
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
              copyRawMarkdown = textmate_raw
              trWarning = true
            }
          "
        >
          原文+翻译.markdown
        </fan-button>
      </div>
      <prose-p>
        请注意本翻译件并非完全的 AI 作品，因此
        <term-tip-mangofan />
        需要你在继续传播翻译内容时署名原作者
        <prose-code>Matt Neuburg</prose-code>
        和译者
        <prose-code>芒果帆帆w</prose-code> 。感谢您的理解。
      </prose-p>
      <prose-hr />
      <raw-copy-block :text="copyRawMarkdown" :translation-warning="trWarning" />
    </card>
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
