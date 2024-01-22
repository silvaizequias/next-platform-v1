import * as z from 'zod'

const ROLE = [
  'client',
  'assistant',
  'technician',
  'administrator',
  'owner',
] as const

export const CreateOrganizationUserDTO = z.object({
  active: z.boolean().optional(),
  role: z.enum(ROLE).optional().default('client'),
  userPhone: z.string().optional(),
  organizationDocument: z.string().optional(),
})
export type CreateOrganizationUserDTOType = z.infer<
  typeof CreateOrganizationUserDTO
>

export const UpdateOrganizationUserDTO = z.object({
  active: z.boolean().optional(),
  role: z.enum(ROLE).optional(),
  userPhone: z.string().optional(),
  organizationDocument: z.string().optional(),
})
export type UpdateOrganizationUserDTOType = z.infer<
  typeof UpdateOrganizationUserDTO
>
