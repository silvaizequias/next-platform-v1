import * as z from 'zod'

export const CreateSupportCategoryDTO = z.object({
  name: z.string(),
  description: z.string().optional(),
})
export type CreateSupportCategoryDTOType = z.infer<
  typeof CreateSupportCategoryDTO
>

export const UpdateSupportCategoryDTO = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
})
export type UpdateSupportCategoryDTOType = z.infer<
  typeof UpdateSupportCategoryDTO
>
