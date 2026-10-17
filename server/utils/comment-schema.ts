import * as z from 'zod'

export const CommentSchema = z.object({
  name: z.string(),
  email: z.email(),
  link: z.url({ protocol: /^https?$/ }).or(z.literal('')),
  content: z.string().max(200).min(8),
  parentId: z.number().optional(),
  route: z.string(),
  token: z.string(),
})
