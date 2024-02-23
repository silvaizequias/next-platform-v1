import * as z from 'zod'

export const CreateOrganizationKeySchema = z.object({
  organizationDocument: z.string().length(14).optional(),
  expireIn: z.coerce.date().optional(),
  active: z.boolean().optional(),
})
export type CreateOrganizationKeySchemaType = z.infer<
  typeof CreateOrganizationKeySchema
>

export const UpdateOrganizationKeySchema = z.object({
  expireIn: z.coerce.date().optional(),
  active: z.boolean().optional(),
})
export type UpdateOrganizationKeySchemaType = z.infer<
  typeof UpdateOrganizationKeySchema
>
