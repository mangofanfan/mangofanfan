<script setup lang="ts">
import { Fragment, computed, provide, ref, useId, useSlots, useTemplateRef, type VNode } from 'vue'
import type { WorkspaceTabEntry } from '~/components/workspace-tabs.shared.ts'
import { WorkspaceTabPanel } from '#components'
import { workspaceTabsKey } from '~/components/workspace-tabs.shared'
import IconifyIcon from '~/components/iconify-icon.vue'

const props = defineProps<{
  /** 初始激活面板（非受控默认值） */
  defaultTab?: string
}>()

/** v-model 可选：绑定后为受控模式 */
const model = defineModel<string>()

const inner = ref(props.defaultTab)

/**
 * 从默认插槽的 vnode 里推导面板清单，而不是让子组件 onMounted 时注册：
 * SSG 是一次性渲染，mounted 注册发生在 tablist 输出之后，
 * 预渲染产物里会没有标签按钮（客户端水合后才补出来，导致闪烁 + 丢 SEO）。
 * 直接读 vnode.props 在服务端就能拿到完整清单。
 */
function flatten(vnodes: VNode[]): VNode[] {
  return vnodes.flatMap((v) =>
    v.type === Fragment && Array.isArray(v.children) ? flatten(v.children as VNode[]) : [v]
  )
}

const slots = useSlots()
const entries = computed<WorkspaceTabEntry[]>(() =>
  flatten(slots.default?.() ?? [])
    .filter((v) => v.type === WorkspaceTabPanel && v.props?.label != null)
    .map((v) => ({
      label: String(v.props!.label),
      icon: String(v.props!.icon),
      content: String(v.props!.content),
      divide: Boolean(v.props!.divide),
      iconSet: v.props!['icon-set'] ?? 'codicon',
    }))
)

/** 优先级：受控值 > 非受控值 > 第一个面板 */
const active = computed(() => model.value ?? inner.value ?? entries.value[0]?.label)

function isActive(value: string) {
  return active.value === value
}

function select(value: string) {
  inner.value = value
  model.value = value
}

const tabsId = useId()
provide(workspaceTabsKey, { tabsId, isActive, select })

/* WAI-ARIA Tabs 模式的 roving tabindex 键盘导航 */
const listEl = useTemplateRef<HTMLElement>('listEl')

function onKeydown(e: KeyboardEvent) {
  const moves: Record<string, (i: number, n: number) => number> = {
    ArrowRight: (i, n) => (i + 1) % n,
    ArrowLeft: (i, n) => (i - 1 + n) % n,
    Home: () => 0,
    End: (_i, n) => n - 1,
  }
  const move = moves[e.key]
  if (!move) return
  e.preventDefault()
  const buttons = Array.from(
    listEl.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? []
  )
  if (buttons.length === 0) return
  const i = Math.max(0, buttons.indexOf(document.activeElement as HTMLButtonElement))
  const target = buttons[move(i, buttons.length)]
  target?.focus()
  target?.click()
}
</script>

<template>
  <card
    extraClass="p-0"
    class="workspace-tabs flex flex-row divide-x divide-dashed divide-gray-400"
  >
    <div
      ref="listEl"
      role="tablist"
      class="workspace-tabs-list px-2 py-2 bg-gray-100 rounded-l-lg flex-0 basis-60 shrink-0 relative"
      @keydown="onKeydown"
    >
      <div class="flex flex-col items-start gap-y-1 sticky top-20">
        <div
          class="w-full"
          v-for="entry in entries"
          :key="entry.label"
          :id="`${tabsId}-${entry.label}-tab`"
        >
          <fan-hr v-if="entry.divide" />
          <button
            type="button"
            role="tab"
            :aria-selected="isActive(entry.label)"
            :aria-controls="`${tabsId}-${entry.label}-panel`"
            :tabindex="isActive(entry.label) ? 0 : -1"
            :class="[
              'workspace-tabs-trigger block font-misans cursor-pointer border rounded-lg w-full',
              'flex flex-row gap-x-2 items-center px-3 py-1',
              isActive(entry.label)
                ? 'border-fan-500 bg-fan-300 text-gray-800'
                : 'border-gray-400 bg-gray-200 text-gray-600 hover:bg-fan-100 hover:border-fan-400 hover:text-gray-800',
            ]"
            @click="select(entry.label)"
          >
            <iconify-icon :set="entry.iconSet" :name="entry.icon" />
            <span class="font-maple-mono">{{ entry.label }}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="px-2 py-2 flex-1 min-w-0">
      <slot />
    </div>
  </card>
</template>

<style scoped></style>
