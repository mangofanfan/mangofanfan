export interface CommitItem {
  hash: string
  short: string
  date: string // ISO 8601，前端 new Date() 解析
  author: string
  message: string
}
