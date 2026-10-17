import * as z from 'zod'
import { eq } from 'drizzle-orm'

const _schema = z.object({route: z.string()})

export default defineEventHandler(async (event) => {
  const res = await getValidatedQuery(event, (event) => _schema.safeParse(event))

  if (!res.success)
    throw createError({
      status: 518,
      data: res.error,
      message: '请提供正确的路径。'
    })

  return await db.select().from(schema.comments).where(eq(schema.comments.route, res.data.route)).all()
})
