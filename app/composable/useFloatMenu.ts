/**
 * 参见 useTip.ts
 * 简化版（……吗？）
 */
import { computed, onBeforeUnmount, onWatcherCleanup, ref, watch } from 'vue'
import type { ShallowRef } from 'vue'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import type { FloatingPlacement } from '~/composable/floatingUi'

/** MenuOptions 包含简化的参数已适配目录结构 */
export interface MenuOptions {
  title: string
  titleId: string
  links: any
  placement?: FloatingPlacement
  offset?: number
  showDelay?: number
  hideDelay?: number
}

export type MenuEmit = (event: 'open' | 'close') => void

/** 三个元素的引用由组件侧 useTemplateRef() 创建后传入 */
export interface MenuRefs {
  reference: Readonly<ShallowRef<HTMLElement | null>>
  floating: Readonly<ShallowRef<HTMLElement | null>>
}

/** 组件渲染层消费的完整句柄 */
export type MenuState = ReturnType<typeof useMenu>

export function useMenu(props: MenuOptions, emit: MenuEmit, refs: MenuRefs) {
  const { reference, floating } = refs

  const open = ref(false)

  // 定位：middleware 顺序即计算顺序
  const { x, y, strategy, placement } = useFloating(reference, floating, {
    placement: computed(() => props.placement ?? 'bottom'),
    middleware: [offset(props.offset ?? 8), flip(), shift({ padding: 8 })],

    whileElementsMounted: autoUpdate,
  })

  let showTimer: ReturnType<typeof setTimeout> | undefined
  let hideTimer: ReturnType<typeof setTimeout> | undefined

  function show() {
    clearTimeout(hideTimer)
    if (open.value) return
    showTimer = setTimeout(() => setOpen(true), props.showDelay ?? 120)
  }

  function hide() {
    clearTimeout(showTimer)
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

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') setOpen(false)
  }
  watch(open, (v) => {
    if (!v) return
    window.addEventListener('keydown', onKeydown)
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
    show,
    hide,
    toggle,
  }
}
