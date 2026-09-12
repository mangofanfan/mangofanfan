<script setup lang="ts">
definePageMeta({
  layout: 'toy',
})

useSeoMeta({
  title: '芒果网更新日志',
  description: '芒果的小站的变更日志',
})

const { data: commits } = await useFetch<CommitItem[]>('/api/changelog')

const readableDate = (originString: string) => {
  const date = new Date(originString)
  return date.toLocaleString()
}
</script>

<template>
  <div class="log-page flex flex-col gap-y-3">
    <message level="info">
      <prose-p>本页是此站点的更新日志，通过 <term-tip-git /> 系统的提交记录自动生成。</prose-p>
    </message>

    <div class="commits flex flex-col border-gray-300 border-2 rounded-lg divide-y divide-gray-300">
      <div class="commit-item px-4 py-2" v-for="commit in commits">
        <div class="w-full flex flex-col md:flex-row items-center">
          <prose-p>{{ commit.message }}</prose-p>
          <fan-button level="fan" class="w-full md:w-24" style="margin-left: auto">
            {{ commit.short }}
          </fan-button>
        </div>
        <div class="w-full flex flex-col md:flex-row items-center">
          <prose-p>{{ readableDate(commit.date) }}</prose-p>
          <prose-code class="line-clamp-1 max-w-full" style="margin-left: auto">
            {{ commit.hash }}
          </prose-code>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.commits > *:first-child {
  border-top-left-radius: var(--radius-lg);
  border-top-right-radius: var(--radius-lg);
}

div.commits > *:last-child {
  border-bottom-left-radius: var(--radius-lg);
  border-bottom-right-radius: var(--radius-lg);
}

div.commit-item:hover {
  background-color: rgb(255 255 255 / 0.5);
}
</style>
