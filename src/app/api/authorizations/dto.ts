import * as z from 'zod'

export const CreateAuthorizationDTO = z.object({
  solutionId: z.string().optional(),
  organization: z.string(),
  expireIn: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
})
export type CreateAuthorizationDTOType = z.infer<typeof CreateAuthorizationDTO>

export const UpdateAuthorizationDTO = z.object({
  solutionId: z.string().optional(),
  organization: z.string().optional(),
  expireIn: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
})
export type UpdateAuthorizationDTOType = z.infer<typeof UpdateAuthorizationDTO>
