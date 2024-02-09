import * as z from 'zod'

export const CreateAuthorizationSchema = z.object({
  organizationDocument: z.string().length(14),
  expireIn: z.coerce.date().optional(),
  active: z.boolean().optional(),
})
export type CreateAuthorizationSchemaType = z.infer<
  typeof CreateAuthorizationSchema
>

export const UpdateAuthorizationSchema = z.object({
  expireIn: z.coerce.date().optional(),
  active: z.boolean().optional(),
})
export type UpdateAuthorizationSchemaType = z.infer<
  typeof UpdateAuthorizationSchema
>
