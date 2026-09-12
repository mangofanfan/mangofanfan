import type { InjectionKey } from 'vue'

export interface WorkspaceTabEntry {
  label: string
  icon: string
  content: any
  divide: boolean
  iconSet: string
}

export interface WorkspaceTabsContext {
  tabsId: string
  isActive: (value: string) => boolean
  select: (value: string) => void
}

export const workspaceTabsKey: InjectionKey<WorkspaceTabsContext> = Symbol('tabs')
