<script setup lang="ts">
import { Fragment, computed, provide, ref, useId, useSlots, useTemplateRef, type VNode } from 'vue'
import { tabsKey, type TabEntry } from './tabs.shared'
import { TabPanel } from '#components'

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
const entries = computed<TabEntry[]>(() =>
  flatten(slots.default?.() ?? [])
    .filter((v) => v.type === TabPanel && v.props?.value != null)
    .map((v) => ({
      value: String(v.props!.value),
      label: String(v.props!.label ?? v.props!.value),
    }))
)

/** 优先级：受控值 > 非受控值 > 第一个面板 */
const active = computed(() => model.value ?? inner.value ?? entries.value[0]?.value)

function isActive(value: string) {
  return active.value === value
}

function select(value: string) {
  inner.value = value
  model.value = value
}

const tabsId = useId()
provide(tabsKey, { tabsId, isActive, select })

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
  <div class="tabs">
    <div ref="listEl" role="tablist" class="tabs-list" @keydown="onKeydown">
      <button
        v-for="entry in entries"
        :key="entry.value"
        :id="`${tabsId}-${entry.value}-tab`"
        type="button"
        role="tab"
        :aria-selected="isActive(entry.value)"
        :aria-controls="`${tabsId}-${entry.value}-panel`"
        :tabindex="isActive(entry.value) ? 0 : -1"
        class="tabs-trigger font-misans"
        :class="{ 'is-active': isActive(entry.value) }"
        @click="select(entry.value)"
      >
        {{ entry.label }}
      </button>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.tabs-list {
  display: flex;
  gap: 0.25rem;
  border-bottom: 1px solid color-mix(in srgb, currentColor 15%, transparent);
}
.tabs-trigger {
  padding: 0.5rem 0.875rem;
  margin-bottom: -1px;
  font: inherit;
  font-size: 0.875rem;
  color: inherit;
  opacity: 0.6;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}
.tabs-trigger:hover {
  opacity: 0.85;
}
.tabs-trigger.is-active {
  opacity: 1;
  border-bottom-color: currentColor;
  font-weight: var(--font-weight-medium);
}
.tabs-trigger:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: -2px;
}
</style>
