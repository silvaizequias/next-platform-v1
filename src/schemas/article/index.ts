import * as z from 'zod'

export const CreateArticleSchema = z.object({
  userId: z.string().optional(),
  subject: z.string(),
  tags: z.string().optional(),
  title: z.string(),
  resume: z.string().optional(),
  image: z.string().optional(),
  video: z.string().optional(),
  audio: z.string().optional(),
  content: z.string(),
})

export type CreateArticleSchemaType = z.infer<typeof CreateArticleSchema>

export const UpdateArticleSchema = z.object({
  userId: z.string().optional(),
  subject: z.string().optional(),
  tags: z.string().optional(),
  resume: z.string().optional(),
  image: z.string().optional(),
  video: z.string().optional(),
  audio: z.string().optional(),
  content: z.string().optional(),
  like: z.number().positive().optional(),
})

export type UpdateArticleSchemaType = z.infer<typeof UpdateArticleSchema>
