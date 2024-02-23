import * as z from 'zod'

const ROLE = [
  'client',
  'assistant',
  'technician',
  'administrator',
  'owner',
] as const

export const CreateOrganizationUserSchema = z.object({
  role: z.enum(ROLE),
  organizationDocument: z.string().length(14).optional(),
  userPhone: z.string().min(10).max(12).optional(),
})
export type CreateOrganizationUserSchemaType = z.infer<
  typeof CreateOrganizationUserSchema
>

export const UpdateOrganizationUserSchema = z.object({
  role: z.enum(ROLE).optional(),
  active: z.boolean().optional(),
})
export type UpdateOrganizationUserSchemaType = z.infer<
  typeof UpdateOrganizationUserSchema
>
