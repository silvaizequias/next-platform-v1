import * as z from 'zod'

const TYPES = ['blog', 'knowledge'] as const

export const CreatePublicationDTO = z.object({
  organization: z.string().min(11).max(14).optional(),
  channel: z.enum(TYPES).default('blog'),
  title: z.string(),
  slug: z.string().optional(),
  subject: z.string(),
  draft: z.boolean().default(false).optional(),
  private: z.boolean().default(false).optional(),
  spotlight: z.boolean().default(false).optional(),
  generatedByAi: z.boolean().default(false).optional(),
  resume: z.string(),
  image: z.string().url().optional(),
  video: z.string().url().optional(),
  content: z.string(),
  keywords: z.string().optional(),
  author: z.string(),
})
export type CreatePublicationDTOType = z.infer<typeof CreatePublicationDTO>

export const UpdatePublicationDTO = z.object({
  channel: z.enum(TYPES).optional(),
  title: z.string().optional(),
  slug: z.string().optional(),
  subject: z.string().optional(),
  draft: z.boolean().optional(),
  private: z.boolean().optional(),
  spotlight: z.boolean().optional(),
  generatedByAi: z.boolean().optional(),
  resume: z.string().optional(),
  image: z.string().url().optional(),
  video: z.string().url().optional(),
  content: z.string().optional(),
  keywords: z.string().optional(),
  author: z.string().optional(),
})
export type UpdatePublicationDTOType = z.infer<typeof UpdatePublicationDTO>
