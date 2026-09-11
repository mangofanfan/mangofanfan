<script setup lang="ts">
import { inject } from 'vue'
import { tabsKey } from './tabs.shared'

defineProps<{
  /** 唯一标识 */
  value: string
  /** 标签按钮上显示的文字 */
  label: string
}>()

const injected = inject(tabsKey, null)
if (!injected) throw new Error('<tab-panel> 必须放在 <tabs> 内部使用')
const ctx = injected
</script>

<template>
  <div
    v-show="ctx.isActive(value)"
    :id="`${ctx.tabsId}-${value}-panel`"
    role="tabpanel"
    :aria-labelledby="`${ctx.tabsId}-${value}-tab`"
    tabindex="0"
    class="tabs-panel"
  >
    <slot />
  </div>
</template>

<style scoped>
.tabs-panel {
  padding-top: 0.75rem;
}
.tabs-panel:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
}
</style>
