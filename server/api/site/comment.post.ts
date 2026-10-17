async function validateTurnstile(token: string, remoteip?: string) {
  const uuid = crypto.randomUUID()
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: process.env.NUXT_TURNSTILE_SECRET,
        response: token,
        remoteip,
        idempotency_key: uuid,
      }),
    })

    return (await response.json()) as { success: boolean; 'error-codes': string[] }
  } catch (error) {
    console.error('Turnstile validation error:', error)
    return { success: false, 'error-codes': ['internal-error'] }
  }
}

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (value) => CommentSchema.safeParse(value))

  if (!result.success)
    throw createError({
      status: 518,
      data: result.error,
      message: '参数校验错误，请重新提交评论。',
    })

  const { name, email, link, content, parentId, route, token } = result.data
  const remoteip = getRequestIP(event)
  const validateResult = await validateTurnstile(token, remoteip)
  if (!validateResult.success)
    throw createError({
      status: 519,
      data: validateResult['error-codes'],
      message: 'Turnstile 验证失败，请刷新后重试。',
    })

  return await db
    .insert(schema.comments)
    .values({
      userId: 0,
      name,
      email,
      link,
      content,
      createdAt: new Date(),
      route,
      parentId,
    })
    .returning()
})
