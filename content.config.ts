import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { defineSchemaOrgSchema } from 'nuxt-schema-org/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        schemaOrg: defineSchemaOrgSchema(),
        head: z
          .object({
            meta: z.array(z.record(z.string(), z.any())).optional(),
            script: z.array(z.record(z.string(), z.any())).optional(),
          })
          .optional(),
        sitemap: defineSitemapSchema(),
        date: z.date(),
        image: z.string(),
        tags: z.array(z.string()),
        published: z.boolean().default(true),
      }),
    }),
    docsMcfpp: defineCollection({
      type: 'page',
      source: 'docs/mcfpp/*.md',
      schema: z.object({
        schemaOrg: defineSchemaOrgSchema(),
        head: z
          .object({
            meta: z.array(z.record(z.string(), z.any())).optional(),
            script: z.array(z.record(z.string(), z.any())).optional(),
          })
          .optional(),
        sitemap: defineSitemapSchema(),
        index: z.number(),
        published: z.boolean().default(true),
        publishedDate: z.date(),
        modifiedDate: z.date(),
      }),
    }),
    docsMcfppVscodeExtension: defineCollection({
      type: 'page',
      source: 'docs/mcfpp-vscode-extension/*.md',
      schema: z.object({
        schemaOrg: defineSchemaOrgSchema(),
        head: z
          .object({
            meta: z.array(z.record(z.string(), z.any())).optional(),
            script: z.array(z.record(z.string(), z.any())).optional(),
          })
          .optional(),
        sitemap: defineSitemapSchema(),
        index: z.number(),
        published: z.boolean().default(true),
        publishedDate: z.date(),
        modifiedDate: z.date(),
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
