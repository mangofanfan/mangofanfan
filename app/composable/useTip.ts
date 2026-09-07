/**
 * useTip —— 术语弹窗的「交互状态机 + Floating UI 定位」
 * 与 UI 完全解耦：TermTip.vue 只管渲染，这里管「何时开/关 + 摆在哪里」。
 * 依赖：vue ^3.5 + @floating-ui/vue ^1
 */
import { computed, onBeforeUnmount, onWatcherCleanup, ref, watch } from 'vue'
import type { ShallowRef } from 'vue'
import { arrow, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'

/** Floating UI 支持的全部方位（top / bottom / left / right + -start / -end） */
export type TipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

/** TermTip.vue 的 defineProps 形状（与组件保持一致） */
export interface TipOptions {
  term: string
  description?: string
  placement?: TipPlacement
  offset?: number
  showDelay?: number
  hideDelay?: number
  interactive?: boolean
}

export type TipEmit = (event: 'open' | 'close') => void

/** 三个元素的引用由组件侧 useTemplateRef() 创建后传入 */
export interface TipRefs {
  reference: Readonly<ShallowRef<HTMLElement | null>>
  floating: Readonly<ShallowRef<HTMLElement | null>>
  arrow: Readonly<ShallowRef<HTMLElement | null>>
}

/** 组件渲染层消费的完整句柄 */
export type TipState = ReturnType<typeof useTip>

export function useTip(props: TipOptions, emit: TipEmit, refs: TipRefs) {
  const { reference, floating, arrow: arrowRef } = refs

  const open = ref(false)

  // 定位：middleware 顺序即计算顺序
  const { x, y, strategy, placement, middlewareData } = useFloating(reference, floating, {
    placement: computed(() => props.placement ?? 'bottom'),
    middleware: [
      offset(props.offset ?? 8), // 1. 弹窗与触发元素的间距
      flip(), // 2. 空间不足时自动翻边
      shift({ padding: 8 }), // 3. 不允许溢出视口
      arrow({ element: arrowRef }), // 4. 箭头坐标
    ],
    // 弹窗元素挂载期间，滚动 / resize 自动重算（v-if 卸载时自动清理）
    whileElementsMounted: autoUpdate,
  })

  // 实际朝向（flip 之后可能与 props.placement 不同）与箭头坐标
  const side = computed(() => placement.value.split('-')[0])
  const arrowX = computed(() => middlewareData.value?.arrow?.x ?? null)
  const arrowY = computed(() => middlewareData.value?.arrow?.y ?? null)

  /* ---------- 悬停意图（hover intent）：show / hide 双计时器 ---------- */
  let showTimer: ReturnType<typeof setTimeout> | undefined
  let hideTimer: ReturnType<typeof setTimeout> | undefined

  function show() {
    clearTimeout(hideTimer) // 从弹窗移回触发器：取消关闭
    if (open.value) return
    showTimer = setTimeout(() => setOpen(true), props.showDelay ?? 120)
  }

  function hide() {
    clearTimeout(showTimer) // 鼠标快速划过：取消显示
    if (!open.value) return
    hideTimer = setTimeout(() => setOpen(false), props.hideDelay ?? 120)
  }

  function toggle() {
    clearTimeout(showTimer)
    clearTimeout(hideTimer)
    setOpen(!open.value)
  }

  function setOpen(v: boolean) {
    if (open.value === v) return
    open.value = v
    emit(v ? 'open' : 'close')
  }

  /* ---------- Esc 关闭 ---------- */
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') setOpen(false)
  }
  watch(open, (v) => {
    if (!v) return
    window.addEventListener('keydown', onKeydown)
    // Vue 3.5：watcher 清理回调 —— 下次变更 / 停止监听时自动移除
    onWatcherCleanup(() => window.removeEventListener('keydown', onKeydown))
  })

  onBeforeUnmount(() => {
    clearTimeout(showTimer)
    clearTimeout(hideTimer)
  })

  return {
    open,
    strategy,
    x,
    y,
    side,
    arrowX,
    arrowY,
    show,
    hide,
    toggle,
  }
}
