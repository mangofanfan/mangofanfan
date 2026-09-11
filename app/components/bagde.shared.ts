export type BadgeLevel = 'fan' | 'info' | 'warning' | 'danger'

export interface BadgeArg {
  level: BadgeLevel
  text?: string
}
