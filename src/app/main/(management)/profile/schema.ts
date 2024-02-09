import * as z from 'zod'

export const ProfileUpdateSchema = z.object({
  name: z.string().optional(),
  document: z.string().min(11).max(14).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(12).optional(),
  zipCode: z.string().length(8).optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type ProfileUpdateSchemaType = z.infer<typeof ProfileUpdateSchema>

export const ProfilePasswordUpdateSchema = z
  .object({
    oldPassword: z.string().min(8),
    newPassword: z.string().min(8).max(25),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'é diferente da nova senha',
    path: ['confirmNewPassword'],
  })
export type ProfilePasswordUpdateSchemaType = z.infer<
  typeof ProfilePasswordUpdateSchema
>
