<script setup lang="ts">
definePageMeta({
  layout: {
    name: 'toy-backup',
    props: {
      name: 'llmstxt',
      title: 'The /llms.txt file, v2',
      titleId: 'the-llmstxt-file-v2',
      tocLinks: [
        {
          id: 'background',
          text: 'Background',
          depth: 2,
        },
        {
          id: 'proposal',
          text: 'Proposal',
          depth: 2,
        },
        {
          id: 'format',
          text: 'Format',
          depth: 2,
        },
        {
          id: 'existing-standards',
          text: 'Existing standards',
          depth: 2,
        },
        {
          id: 'example',
          text: 'Example',
          depth: 2,
        },
        {
          id: 'directories',
          text: 'Directories',
          depth: 2,
        },
        {
          id: 'next-steps',
          text: 'Next steps',
          depth: 2,
        },
      ],
    },
  },
})

useSeoMeta({
  title: 'llms.txt 提案（翻译）',
  description: `一项关于标准化使用 /llms.txt 文件来提供信息以帮助智能体使用网站的提议。`,
})
</script>

<template></template>

<style scoped></style>
