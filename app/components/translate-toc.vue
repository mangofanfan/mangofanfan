<script setup lang="ts">
import type { TocLink } from '@nuxt/content'
import type { Strategy } from '@floating-ui/vue'
import { useMenu } from '~/composable/useFloatMenu.ts'
import type { FloatingPlacement } from '~/composable/floatingUi'

interface Props {
  title: string
  titleId: string
  links: TocLink[]
  placement?: FloatingPlacement
  offset?: number
  showDelay?: number
  hideDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom',
  offset: 8,
  showDelay: 120,
  hideDelay: 120,
})

const emit = defineEmits(['open', 'close'])

const reference = useTemplateRef('reference')
const floating = useTemplateRef('floating')

const { open, strategy, x, y, show, hide, toggle } = useMenu(props, emit, {
  reference,
  floating,
})

defineExpose({ open, show, hide, toggle })

const tocId = useId()

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

// 因一些技术困难，这里无法实现滚动时目录高亮……
</script>

<template>
  <div
    ref="reference"
    :class="[
      'translate-toc relative border border-green-300 bg-green-50 rounded-md size-10',
      'hover:bg-green-300 hover:border-green-500 cursor-pointer',
      'dark:border-green-600 dark:bg-green-900 hover:dark:bg-green-600 hover:dark:border-green-400',
      'flex flex-row items-center justify-center',
    ]"
    @click="toggle"
  >
    <iconify-icon class="text-green-700 dark:text-green-200" set="fa6-solid" name="list-ul" />
  </div>

  <teleport to="body">
    <transition name="translate-toc">
      <div
        v-if="open"
        :class="[
          'translate-toc__content w-100 h-fit rounded-lg z-9999 p-2',
          'border border-green-700 bg-green-50',
          'dark:border-green-200 dark:bg-green-900',
        ]"
        :id="tocId"
        ref="floating"
        role="tooltip"
        :style="contentStyle"
        @mouseenter="show"
        @mouseleave="hide"
      >
        <nav class="font-misans">
          <a class="line-clamp-1 font-semibold" :href="'#' + titleId" @click="hide">
            {{ title }}
          </a>
          <prose-hr />
          <ul class="flex flex-col gap-y-1">
            <li v-for="link of links" v-bind:key="link.id" class="depth">
              <a class="line-clamp-1" @click="hide" :href="'#' + link.id">{{ link.text }}</a>
              <ul v-if="link.children" class="translate-toc__second-ul flex flex-col gap-y-1">
                <li class="depth" v-for="child of link.children" v-bind:key="child.id">
                  <a class="line-clamp-1" @click="hide" :href="'#' + child.id">{{ child.text }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
ul.translate-toc__second-ul {
  border-left: 2px solid var(--color-gray-200);
}

li.depth {
  border-left: 2px solid transparent;
  padding-left: 3px;
}
</style>

<style>
.translate-toc-enter-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}
.translate-toc-leave-active {
  transition: opacity 0.12s ease;
}
.translate-toc-enter-from,
.translate-toc-leave-to {
  opacity: 0;
}
.translate-toc-enter-from {
  transform: translateY(4px);
}
</style>
