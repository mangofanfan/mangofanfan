<script setup lang="ts">
import Clipboard from 'clipboard'

defineProps<{
  text: string
  translationWarning?: boolean
}>()

let clipboard: Clipboard | null = null

onMounted(() => {
  clipboard = new Clipboard('.copy-btn')
  clipboard.on('success', (e) => e.clearSelection())
  clipboard.on('error', (e) => console.error('Error:', e.action))
})

onUnmounted(() => {
  clipboard = null
})
</script>

<template>
  <message v-if="translationWarning" level="warning">
    <prose-p>
      在“原文+译文.markdown”中，使用了
      <prose-code>&lt;translate-paragraph&gt;</prose-code>
      Vue 组件来组织原文与译文的关系，因此这些内容不可直接使用。
    </prose-p>
    <prose-p>
      但你可以通过如下正则表达式（适用 <term-tip-javascript />）轻松地从中提取原文和译文：
    </prose-p>
    <prose-code>/::translate-paragraph\r?\n#o\r?\n(.*?)\n#t\r?\n(.*?)\r?\n::/gms</prose-code>
  </message>
  <div class="relative flex flex-col gap-y-2">
    <div
      :class="[
        'sticky top-18 flex flex-row items-center w-full',
        'p-1 border rounded-md border-blue-500 bg-blue-50',
      ]"
    >
      <prose-p>Ciallo～(∠·ω< )⌒★</prose-p>
      <fan-button
        class="copy-btn block size-10"
        style="margin-left: auto"
        level="info"
        data-clipboard-target="#source"
      >
        <iconify-icon set="fa6-solid" name="copy" />
      </fan-button>
    </div>
    <pre
      :class="[
        'p-2 border rounded-md font-maple-mono break-all whitespace-pre-wrap',
        'bg-gray-200 border-gray-600',
      ]"
      id="source"
      >{{ text }}</pre>
  </div>
</template>

<style scoped></style>
