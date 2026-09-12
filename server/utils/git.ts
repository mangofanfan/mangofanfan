import { simpleGit } from 'simple-git'

export interface CommitItem {
  hash: string
  short: string
  date: string // ISO 8601，前端 new Date() 解析
  author: string
  message: string
}

const git = simpleGit()

export async function getChangelog(maxCount = 100): Promise<CommitItem[]> {
  const log = await git.log({ maxCount, '--no-merges': null })
  return log.all.map((c) => ({
    hash: c.hash,
    short: c.hash.slice(0, 7),
    date: c.date,
    author: c.author_name ?? '',
    message: c.message,
  }))
}
