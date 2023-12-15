import * as z from 'zod'

export const CreateSolutionDTO = z.object({
  name: z.string(),
  description: z.string().optional(),
  apiUrl: z.string().url(),
})
export type CreateSolutionDTOType = z.infer<typeof CreateSolutionDTO>

export const UpdateSolutionDTO = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  apiUrl: z.string().url().optional(),
})
export type UpdateSolutionDTOType = z.infer<typeof UpdateSolutionDTO>
