import * as z from 'zod'

const scheme = z.object({ url: z.url() })

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, (body) => scheme.safeParse(body))

  if (!data.success)
    throw createError({
      statusCode: 511,
      message: 'URL 检验错误，请提供合法 URL。',
    })

  const url = data.data.url
  let raw: string
  try {
    raw = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; mango-js-analyzer)' },
    }).then((res) => res.text())
  } catch (err) {
    throw createError({
      statusCode: 512,
      message: '访问 URL 时失败：' + String(err),
    })
  }

  return {
    target: url,
    raw,
  }
})
