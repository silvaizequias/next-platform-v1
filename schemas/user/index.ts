import * as z from 'zod'

const PROFILE = ['master', 'member', 'consumer', 'guest'] as const

export const CreateUserSchema = z.object({
  profile: z.enum(PROFILE),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(10).max(12),
  password: z.string().min(8).max(25).optional(),
  document: z.string().min(11).max(14).optional(),
  zipCode: z.string().length(8).optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>

export const UpdateUserSchema = z.object({
  active: z.boolean().optional(),
  subscriber: z.boolean().optional(),
  suspended: z.boolean().optional(),
  profile: z.enum(PROFILE).optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(12).optional(),
  password: z.string().min(8).max(25).optional(),
  document: z.string().min(11).max(14).optional(),
  zipCode: z.string().length(8).optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>
