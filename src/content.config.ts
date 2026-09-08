import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    stack: z.array(z.string()),
    role: z.string(),
    dates: z.string(),
    status: z.string(),
    links: z
      .object({
        live: z.url().optional(),
        repo: z.url().optional(),
        demo: z.url().optional(),
      })
      .default({}),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

/**
 * Posts with `draft: true` are loaded into the collection but never routed and
 * never listed, so they produce no page in the build. That is how
 * `_example.md` stays in the repo as a format reference without publishing.
 * The leading underscore is a naming convention for humans; `draft` is what
 * the build actually honours.
 */
const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writing };
