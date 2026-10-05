import * as z from 'zod'

const scheme = z.object({
  origin: z.url(),
  url: z.url(),
})

export default defineEventHandler(async (event) => {
  const data = await getValidatedQuery(event, (q) => scheme.safeParse(q))

  if (!data.success) {
    throw createError({
      statusCode: 511,
      message: '查询参数错误，所有参数均需要为 URL，请检查。'
    })
  }

  const origin = data.data.origin
  const url = data.data.url

  const upstream = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; mango-js-analyzer)',
      accept: 'image/*,*/*;q=0.8',
      referer: origin
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(10_000)
  })
  if (!upstream.ok) throw createError({
    statusCode: 512,
    message: '访问 URL 获取图像时失败：' + url
  })
  const type = upstream.headers.get('Content-Type') ?? ''

  return new Response(upstream.body, {
    headers: {'Content-Type': type, 'Cache-Control': 'public, max-age-86400'}
  })
})
