import * as z from 'zod'

export const createArticle = z.object({})
export type createArticleType = z.infer<typeof createArticle>

export const updateArticle = z.object({})
export type updateArticleType = z.infer<typeof updateArticle>

export const removeArticle = z.object({})
export type removeArticleType = z.infer<typeof removeArticle>
