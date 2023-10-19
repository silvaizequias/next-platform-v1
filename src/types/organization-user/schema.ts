import * as z from 'zod'

const ROLE = ['GUEST', 'CUSTOMER', 'MEMBER', 'ADMINISTRATOR', 'OWNER'] as const

export const CreateOrganizationUser = z.object({
  userPhone: z.string().length(11).optional(),
  organizationDocumentCode: z.string().length(14).optional(),
  role: z.enum(ROLE),
})
export type CreateOrganizationUserType = z.infer<typeof CreateOrganizationUser>

export const UpdateOrganizationUser = z.object({
  userPhone: z.string().length(11).optional(),
  organizationDocumentCode: z.string().length(14).optional(),
  isActive: z.boolean().optional(),
  role: z.enum(ROLE),
})
export type UpdateOrganizationUserType = z.infer<typeof UpdateOrganizationUser>
