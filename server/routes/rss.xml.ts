import { Feed } from 'feed'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeUrls from 'rehype-urls'
import rehypeStringify from 'rehype-stringify'

export default defineEventHandler(async (event) => {
  const site = 'https://mango.js.cn'
  // 注意：你已知 order('date', 'DESC') 的 TS2345 类型问题（issue #2968），RSS 这里同样会遇到
  const posts = await queryCollection(event, 'blog').order('date', 'DESC').limit(30).all()

  const feed = new Feed({
    title: '芒果客栈',
    id: site,
    link: site,
    language: 'zh-CN',
    feedLinks: { rss: `${site}/rss.xml` },
    updated: posts[0] ? new Date(posts[0].date as string) : new Date(),
  })

  for (const p of posts) {
    const html = await renderMarkdown(p.rawbody as string, site)
    feed.addItem({
      title: p.title as string,
      id: `${site}${p.path}`,
      link: `${site}${p.path}`,
      description: p.description as string,
      content: html, // 输出 <content:encoded>，RSS 阅读器里可直接读全文
      date: new Date(p.date as string),
    })
  }
  setResponseHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return feed.rss2()
})

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

async function renderMarkdown(raw: string, site: string) {
  return String(await pipeline.process(cleanRaw(raw)))
}
