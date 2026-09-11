// app/components/tabs.shared.ts
import type { InjectionKey } from 'vue'

export interface TabEntry {
  value: string
  label: string
}

export interface TabsContext {
  tabsId: string
  isActive: (value: string) => boolean
  select: (value: string) => void
}

export const tabsKey: InjectionKey<TabsContext> = Symbol('tabs')
