import * as z from 'zod'

export const CreatePostDTO = z.object({
  title: z.string(),
  subject: z.string(),
  draft: z.boolean().optional(),
  private: z.boolean().optional(),
  spotlight: z.boolean().optional(),
  resume: z.string().optional(),
  image: z.string().optional(),
  video: z.string().optional(),
  content: z.string(),
  keywords: z.string().optional(),
})
export type CreatePostDTOType = z.infer<typeof CreatePostDTO>

export const PostUpdateDTO = z.object({
  title: z.string().optional(),
  subject: z.string().optional(),
  draft: z.boolean().optional(),
  private: z.boolean().optional(),
  spotlight: z.boolean().optional(),
  resume: z.string().optional(),
  image: z.string().optional(),
  video: z.string().optional(),
  content: z.string().optional(),
  keywords: z.string().optional(),
})
export type PostUpdateDTOType = z.infer<typeof PostUpdateDTO>
