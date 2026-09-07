<!--
  TermTip —— 术语悬浮解释弹窗（纯 Floating UI，无组件库依赖）
  依赖：vue ^3.5 + @floating-ui/vue ^1
  用法：
    <TermTip term="激活事件" description="用于激活插件的事件钩子" />
    <TermTip term="MCFPP">
      <template #content>
        <strong>MCFPP</strong> 面向数据包的编译型语言……
      </template>
    </TermTip>
-->
<script setup lang="ts">
import { computed, useId, useTemplateRef } from 'vue'
import { useTip, type TipPlacement } from '~/composable/useTip.ts'
import type { Strategy } from '@floating-ui/vue'

interface Props {
  /** 术语标题（同时作为弹窗标题与默认触发文字） */
  term: string
  /** 术语解释（纯文本；富文本请用 #content 插槽） */
  description?: string
  /** 弹出方位：top / bottom / left / right（支持 -start / -end 后缀） */
  placement?: TipPlacement
  /** 弹窗与触发元素的间距（px） */
  offset?: number
  /** 显示 / 隐藏延迟（ms），构成悬停意图去抖 */
  showDelay?: number
  hideDelay?: number
  /** 弹窗内是否可交互（移入弹窗不关闭，适合放链接） */
  interactive?: boolean
  /** 参考链接 */
  seeLinks?: { name: string; url: string }[]
}

// 使用 withDefaults 来设置默认值
const props = withDefaults(defineProps<Props>(), {
  description: '',
  placement: 'bottom',
  offset: 8,
  showDelay: 120,
  hideDelay: 120,
  interactive: true,
})

const emit = defineEmits(['open', 'close'])

// Vue 3.5 useTemplateRef：模板里直接写 ref="reference" 即可绑定
const reference = useTemplateRef('reference')
const floating = useTemplateRef('floating')
const arrow = useTemplateRef('arrow')

const { open, strategy, x, y, side, arrowX, arrowY, show, hide, toggle } = useTip(props, emit, {
  reference,
  floating,
  arrow,
})

// 手动控制场景：父组件通过 ref 调用 show() / hide() / toggle()
defineExpose({ open, show, hide, toggle })

// Vue 3.5 useId：SSR 安全的唯一 id（同一渲染链路内稳定）
const tipId = useId()

// 关键：首帧定位未算出前用 visibility 兜底，避免弹窗在 (0,0) 闪现
const contentStyle = computed<{
  position: Strategy
  top: string
  left: string
  visibility: 'hidden' | 'visible'
}>(() => ({
  position: strategy.value,
  top: `${y.value ?? 0}px`,
  left: `${x.value ?? 0}px`,
  visibility: y.value == null ? 'hidden' : 'visible',
}))

// 箭头坐标：top/bottom 方向用 x 轴，left/right 方向用 y 轴（另一轴由 CSS 类兜底）
const arrowStyle = computed(() => ({
  left: arrowX.value != null ? `${arrowX.value}px` : '',
  top: arrowY.value != null ? `${arrowY.value}px` : '',
}))
</script>

<template>
  <!-- 触发器：一个 span，可 hover / Tab 聚焦 -->
  <span
    ref="reference"
    class="term-tip__trigger"
    tabindex="0"
    :aria-describedby="open ? tipId : undefined"
    @mouseenter="show()"
    @mouseleave="hide()"
    @focusin="show()"
    @focusout="hide()"
  >
    <slot>{{ term }}</slot>
  </span>

  <!-- 弹窗：Teleport 到 body，逃离父级 overflow / z-index 陷阱 -->
  <Teleport to="body">
    <Transition name="term-tip">
      <div
        v-if="open"
        :id="tipId"
        ref="floating"
        class="term-tip__content"
        role="tooltip"
        :style="contentStyle"
        @mouseenter="interactive && show()"
        @mouseleave="interactive && hide()"
      >
        <strong class="term-tip__title font-misans">{{ term }}</strong>
        <p class="term-tip__desc font-misans" v-if="description">{{ description }}</p>
        <slot name="content" class="font-misans" />
        <hr style="margin: 6px 0" v-if="seeLinks" />
        <div
          class="term-tip__seeLinks flex flex-row gap-x-2 border border-gray-600 bg-gray-100 rounded-md px-3 py-1"
          v-if="seeLinks"
        >
          <prose-a
            v-for="seeLink of seeLinks"
            v-bind:key="seeLink.name"
            class="block font-misans"
            :href="seeLink.url"
            target="_blank"
            >{{ seeLink.name }}</prose-a
          >
        </div>
        <span
          ref="arrow"
          class="term-tip__arrow"
          :class="`term-tip__arrow--${side}`"
          :style="arrowStyle"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.term-tip__trigger {
  color: #185fa5;
  border-bottom: 1px dashed #378add;
  cursor: help;
}
.term-tip__trigger:hover {
  color: #042c53;
  border-bottom-style: solid;
}

.term-tip__content {
  width: max-content;
  max-width: 320px;
  padding: 10px 14px;
  background: #fff;
  color: #042c53;
  border: 1.5px solid #185fa5;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.7;
  z-index: 9999;
}
.term-tip__title {
  display: block;
  color: #185fa5;
  font-weight: 600;
  margin-bottom: 2px;
}
.term-tip__desc {
  margin: 0;
}

.term-tip__arrow {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #fff;
  transform: rotate(45deg);
}
.term-tip__arrow--bottom {
  top: -5.5px;
  border-top: 1.5px solid #185fa5;
  border-left: 1.5px solid #185fa5;
}
.term-tip__arrow--top {
  bottom: -5.5px;
  border-bottom: 1.5px solid #185fa5;
  border-right: 1.5px solid #185fa5;
}
.term-tip__arrow--left {
  right: -5.5px;
  border-top: 1.5px solid #185fa5;
  border-right: 1.5px solid #185fa5;
}
.term-tip__arrow--right {
  left: -5.5px;
  border-left: 1.5px solid #185fa5;
  border-bottom: 1.5px solid #185fa5;
}
</style>

<style>
.term-tip-enter-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}
.term-tip-leave-active {
  transition: opacity 0.12s ease;
}
.term-tip-enter-from,
.term-tip-leave-to {
  opacity: 0;
}
.term-tip-enter-from {
  transform: translateY(4px);
}
</style>
