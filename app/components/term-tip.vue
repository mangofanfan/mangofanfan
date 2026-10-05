<script setup lang="ts">
interface Props {
  /** 术语标题（同时作为弹窗标题与默认触发文字） */
  term: string
  /** 术语解释（纯文本；富文本请用 #content 插槽） */
  description?: string
  /** 弹窗内是否可交互（移入弹窗不关闭，适合放链接） */
  interactive?: boolean
  /** 参考链接 */
  seeLinks?: { name: string, url: string }[]
}

withDefaults(defineProps<Props>(), {
  description: '',
  interactive: true
})
</script>

<template>
  <UPopover mode="hover">
    <span
      tabindex="0"
      class="underline decoration-dashed decoration-cyan-500 decoration-2"
    >
      <slot>{{ term }}</slot>
    </span>

    <template #content>
      <div class="px-4 py-3 space-y-2 text-sm">
        <p class="font-medium">
          {{ term }}
        </p>

        <p>{{ description }}</p>

        <slot name="content" />
      </div>
    </template>
  </UPopover>
</template>

<style scoped>

</style>
