import * as z from 'zod'

export const CreateOrganizationKeyDTO = z.object({
  organizationDocument: z.string(),
  expireIn: z.coerce.date().optional(),
  active: z.boolean().default(true).optional(),
})
export type CreateOrganizationKeyDTOType = z.infer<
  typeof CreateOrganizationKeyDTO
>

export const UpdateOrganizationKeyDTO = z.object({
  expireIn: z.coerce.date().optional(),
  active: z.boolean().optional(),
})
export type UpdateOrganizationKeyDTOType = z.infer<
  typeof UpdateOrganizationKeyDTO
>
