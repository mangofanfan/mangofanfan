// '#changelog' 是 nuxt.config.ts 里 nitro.virtual 注入的构建期 git log 数据
// （类型声明见 server/types/changelog.d.ts）
import { changelog } from '#changelog'

export default defineEventHandler(() => changelog)
