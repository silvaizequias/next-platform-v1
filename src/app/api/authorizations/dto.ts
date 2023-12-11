import * as z from 'zod'

export const CreateAuthorizationDTO = z.object({
  solution: z.string(),
  organization: z.string(),
  role: z.string(),
  expireIn: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
})
export type CreateAuthorizationDTOType = z.infer<typeof CreateAuthorizationDTO>

export const UpdateAuthorizationDTO = z.object({
  solution: z.string().optional(),
  organization: z.string().optional(),
  role: z.string().optional(),
  expireIn: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
})
export type UpdateAuthorizationDTOType = z.infer<typeof UpdateAuthorizationDTO>
