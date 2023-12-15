import * as z from 'zod'

export const CreateSubdomainDTO = z.object({
  name: z.string(),
  slug: z.string().optional(),
  private: z.boolean().optional(),
})
export type CreateSubdomainDTOType = z.infer<typeof CreateSubdomainDTO>

export const UpdateSubdomainDTO = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  private: z.boolean().optional(),
})
export type UpdateSubdomainDTOType = z.infer<typeof UpdateSubdomainDTO>
