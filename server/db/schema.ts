import type { AnySQLiteColumn } from 'drizzle-orm/sqlite-core'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const comments = sqliteTable('comments', {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: integer().notNull(), // 目前默认为 0
  route: text().notNull(), // 评论所在页面的 route
  parentId: integer().references((): AnySQLiteColumn => comments.id), // 父评论
  content: text().notNull(),
  name: text().notNull(),
  email: text().notNull(),
  link: text(),
  createdAt: integer({ mode: 'timestamp' }).notNull(),
  show: integer({ mode: 'boolean' }).default(true).notNull(),
})
