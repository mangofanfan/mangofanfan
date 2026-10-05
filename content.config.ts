import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        sitemap: defineSitemapSchema(),
        date: z.string(),
        image: z.string(),
        tags: z.array(z.string()),
        published: z.boolean().default(true),
      }),
    }),
    docsMcfpp: defineCollection({
      type: 'page',
      source: 'docs/mcfpp/*.md',
      schema: z.object({
        sitemap: defineSitemapSchema(),
        index: z.number(),
        published: z.boolean().default(true),
      }),
    }),
    docsMcfppVscodeExtension: defineCollection({
      type: 'page',
      source: 'docs/mcfpp-vscode-extension/*.md',
      schema: z.object({
        sitemap: defineSitemapSchema(),
        index: z.number(),
        published: z.boolean().default(true),
      }),
    }),
    toys: defineCollection({
      type: 'page',
      source: 'toys/**/*.md',
      schema: z.object({
        image: z.string(),
      }),
    }),
  },
})
