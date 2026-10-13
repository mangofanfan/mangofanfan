<script setup lang="ts">
definePageMeta({
  layout: 'file',
  // 不允许任何索引
  robots: {
    none: true,
  },
})

const title = 'B240423 大三上学期实验安排'
const description = '包含 B240423 班级涉及的本学期所有实验课，从总表中筛选并整理。'
useSeoMeta({
  title,
  description,
  ogType: 'website',
  ogTitle: title,
  ogDescription: description,
  ogUrl: 'https://mango.js.cn/file/grade-3-1-exp-sch/',
})

const setFileInfo = inject('set-file-meta') as (arg1: string, arg2: string, arg3: string) => void
setFileInfo(title, description, 'vscode-icons:file-type-html')
</script>

<template>
  <div class="grade-3-1-exp-sch-page h-[85vh]">
    <iframe
      class="w-full h-full rounded-lg shadow-2xl ring ring-default"
      src="/files/school/grade-3-1-experiment-schedule.html"
    />
  </div>
</template>

<style scoped></style>
