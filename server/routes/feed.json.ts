export default defineEventHandler(async (event) => {
  const feed = await buildFeed(event)
  setResponseHeader(event, 'content-type', 'application/feed+json; charset=utf-8')
  return feed.json1()
})
