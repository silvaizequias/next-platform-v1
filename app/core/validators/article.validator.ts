import * as z from 'zod'

export const createArticle = z.object({
  userPhone: z.string().optional(),
  active: z.boolean().default(true).optional(),
  spotlight: z.boolean().default(false).optional(),
  private: z.boolean().default(false).optional(),
  slug: z.string().optional(),
  title: z.string(),
  subject: z.string().optional(),
  resume: z.string().optional(),
  content: z.string(),
  tags: z.string().optional(),
})
export type createArticleType = z.infer<typeof createArticle>

export const updateArticle = z.object({
  active: z.boolean().optional(),
  spotlight: z.boolean().optional(),
  private: z.boolean().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  subject: z.string().optional(),
  resume: z.string().optional(),
  content: z.string().optional(),
  tags: z.string().optional(),
})
export type updateArticleType = z.infer<typeof updateArticle>

export const removeArticle = z.object({
  definitely: z.boolean().default(false).optional(),
})
export type removeArticleType = z.infer<typeof removeArticle>
