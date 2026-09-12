<script setup lang="ts">
import { inject } from 'vue'
import { workspaceTabsKey } from './workspace-tabs.shared'

defineProps<{
  label: string
  icon: string
  content: any
  divide?: boolean
}>()

const injected = inject(workspaceTabsKey, null)
if (!injected) {
  // noinspection RequiredAttributes,VueMissingComponentImportInspection
  throw new Error('<workspace-tab-panel> 必须放在 <workspace-tabs> 内部使用')
}
const ctx = injected
</script>

<template>
  <div
    v-show="ctx.isActive(label)"
    :id="`${ctx.tabsId}-${label}-panel`"
    role="tabpanel"
    :aria-labelledby="`${ctx.tabsId}-${label}-tab`"
    tabindex="0"
    class="workspace-tab-panel"
  >
    <ContentRenderer
      class="flex flex-col gap-y-2 w-full"
      v-if="content"
      :value="content"
      :data="content.data"
    />
  </div>
</template>

<style scoped></style>
