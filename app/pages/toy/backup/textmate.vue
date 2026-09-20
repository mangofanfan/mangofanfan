<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

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

definePageMeta({
  layout: {
    name: 'toy-backup',
    props: {
      name: 'textmate',
      tocLinks: tocOrigin,
      title: 'Writing a TextMate Grammar: Some Lessons Learned',
      titleId: 'writing-a-textmate-grammar-some-lessons-learned',
    },
  },
})

useSeoMeta({
  title: '编写 TextMate 语法：一些需要学习的课程（翻译）',
  description: `Dr.Matt Neuburg 的技术博客 Writing a TextMate Grammar: Some Lessons Learned 的非官方中文翻译。
    尽管 TextMate 已经存在了很长时间（按计算机的年份来算），而且已经出现了许多语言包，但令人惊讶的是，编写语言语法的过程仍然缺乏文档记录。`,
})
</script>

<template>
  <prose-p>
    请注意本翻译件并非完全的 AI 作品，因此
    <term-tip-mangofan />
    需要你在继续传播翻译内容时署名原作者
    <prose-code>Matt Neuburg</prose-code>
    和译者
    <prose-code>芒果帆帆w</prose-code> 。感谢您的理解。
  </prose-p>
</template>

<style scoped></style>
