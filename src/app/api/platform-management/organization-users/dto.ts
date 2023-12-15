import * as z from 'zod'

const ROLE = ['GUEST', 'CUSTOMER', 'MEMBER', 'ADMINISTRATOR', 'OWNER'] as const

export const CreateOrganizationUserDTO = z.object({
  organizationId: z.string().optional(),
  userId: z.string().optional(),
  isActive: z.boolean().optional(),
  role: z.enum(ROLE),
})
export type CreateOrganizationUserDTOType = z.infer<
  typeof CreateOrganizationUserDTO
>

export const UpdateOrganizationUserDTO = z.object({
  organizationId: z.string().optional(),
  userId: z.string().optional(),
  isActive: z.boolean().optional(),
  role: z.enum(ROLE).optional(),
})
export type UpdateOrganizationUserDTOType = z.infer<
  typeof UpdateOrganizationUserDTO
>
