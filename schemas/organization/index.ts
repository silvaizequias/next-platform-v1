import * as z from 'zod'

export const CreateOrganizationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(10).max(12),
  document: z.string().length(14),
  zipCode: z.string().optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type CreateOrganizationSchemaType = z.infer<
  typeof CreateOrganizationSchema
>

export const UpdateOrganizationSchema = z.object({
  active: z.boolean().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(12).optional(),
  document: z.string().length(14).optional(),
  zipCode: z.string().optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type UpdateOrganizationSchemaType = z.infer<
  typeof UpdateOrganizationSchema
>
