import { Feed } from 'feed'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeUrls from 'rehype-urls'
import rehypeStringify from 'rehype-stringify'
import type { H3Event } from 'h3'

export async function buildFeed(event: H3Event) {
  const site = 'https://mango.js.cn'
  // 注意：你已知 order('date', 'DESC') 的 TS2345 类型问题（issue #2968），RSS 这里同样会遇到
  const posts = await queryCollection(event, 'blog').order('date', 'DESC').limit(30).all()

  const feed = new Feed({
    title: '芒果客栈',
    id: site,
    link: site,
    language: 'zh-CN',
    feedLinks: { rss: `${site}/rss.xml` },
    updated: new Date(posts[0]!.date as string),
  })

  for (const p of posts) {
    if (!p.published) continue // 跳过未发布的草稿

    const html = await renderMarkdown(p.rawbody as string)
    feed.addItem({
      title: p.title as string,
      id: `${site}${p.path}`,
      link: `${site}${p.path}`,
      description: p.description as string,
      content: html, // 输出 <content:encoded>，RSS 阅读器里可直接读全文
      date: new Date(p.date as string),
    })
  }

  return feed
}

// SQLite 里的 rawbody 换行被转义成字面量 "\n"，必须先还原
function cleanRaw(s: string) {
  return (
    s
      //.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
      .replace(/\\n/g, '\n')
      .trim()
  )
}

const pipeline = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeUrls, (url) => (url.host ? url : new URL(url.href, 'https://mango.js.cn')))
  .use(rehypeStringify, { allowDangerousHtml: true })

async function renderMarkdown(raw: string) {
  return String(await pipeline.process(cleanRaw(raw)))
}
