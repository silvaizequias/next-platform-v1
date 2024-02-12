import * as z from 'zod'

const CHANEL = ['blog', 'support'] as const

export const CreatePublicationSchema = z.object({
  organization: z.string(),
  author: z.string(),
  channel: z.enum(CHANEL).default('blog'),
  draft: z.boolean().default(false).optional(),
  private: z.boolean().default(false).optional(),
  spotlight: z.boolean().default(false).optional(),
  generatedByAi: z.boolean().default(false).optional(),
  title: z.string().min(10).max(40),
  subject: z.string(),
  slug: z.string().optional(),
  resume: z.string(),
  image: z.string().optional(),
  video: z.string().optional(),
  content: z.string(),
  keywords: z.string().optional(),
})
export type CreatePublicationSchemaType = z.infer<
  typeof CreatePublicationSchema
>

export const UpdatePublicationSchema = z.object({
  organization: z.string().optional(),
  author: z.string().optional(),
  channel: z.enum(CHANEL).optional(),
  draft: z.boolean().optional(),
  private: z.boolean().optional(),
  spotlight: z.boolean().optional(),
  generatedByAi: z.boolean().optional(),
  title: z.string().min(10).max(40).optional(),
  subject: z.string().optional(),
  slug: z.string().optional(),
  resume: z.string().optional(),
  image: z.string().optional(),
  video: z.string().optional(),
  content: z.string().optional(),
  keywords: z.string().optional(),
})
export type UpdatePublicationSchemaType = z.infer<
  typeof UpdatePublicationSchema
>
