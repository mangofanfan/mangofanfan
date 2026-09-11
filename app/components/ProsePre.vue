<script setup lang="ts">
const props = defineProps<{
  class?: string
  code?: string // 原始代码文本（复制按钮用它，注意不是 slot）
  language?: string
  filename?: string
  highlights?: number[] // ```ts [file.ts]{2,4-6} 语法指定的行号
  meta?: string
}>()
</script>

<template>
  <div
    class="border border-fuchsia-500 bg-fuchsia-50 rounded max-w-full overflow-hidden flex flex-col py-2"
  >
    <div class="px-3 flex flex-row gap-x-2 items-center">
      <prose-code>{{ language ? language : 'Unknown' }}</prose-code>
      <span v-if="filename" class="text-fuchsia-800 font-maple-mono">{{ filename }}</span>
    </div>
    <prose-hr />
    <pre
      :class="[
        'shiki px-2 py-1 prose-pre__pre block font-maple-mono max-w-full overflow-x-auto',
        props.class,
      ]"
    ><slot /></pre>
  </div>
</template>

<style>
.shiki {
  font-size: 1rem;
}

/* 行号 */
.shiki code {
  counter-reset: line;
  font-family: var(--font-maple-mono), monospace;
}
.shiki .line {
  counter-increment: line;
}
.shiki .line::before {
  content: counter(line);
  display: inline-block;
  width: 2rem;
  text-align: right;
  margin-right: 0.5rem;
  color: color-mix(in srgb, currentColor 30%, transparent);
  user-select: none;
}
</style>
