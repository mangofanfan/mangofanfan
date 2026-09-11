export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path')

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing markdown document path',
    })
  }

  return await parseMarkdownDocument(path)
})
