import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      // Define custom schema for docs collection
      schema: z.object({
        tags: z.array(z.string()),
        image: z.string(),
        date: z.date(),
      }),
    }),
    mcfpp: defineCollection({
      type: 'page',
      source: 'mcfpp/*.md',
      schema: z.object({
        index: z.number(),
      }),
    }),
    mcfppVscodeExtension: defineCollection({
      type: 'page',
      source: 'mcfpp/vscode-extension/*.md',
      schema: z.object({
        index: z.number(),
      }),
    }),
  },
})
