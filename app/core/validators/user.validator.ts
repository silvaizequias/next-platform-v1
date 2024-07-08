import * as z from 'zod'

export const USER_ROLE = ['master', 'customer'] as const

export const createUser = z.object({
  role: z.enum(USER_ROLE).default('customer').optional(),
  name: z.string().min(5).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(11).max(13),
  secret: z.string().optional(),
  document: z.string().optional(),
})
export type createUserType = z.infer<typeof createUser>

export const updateUser = z.object({
  active: z.boolean().optional(),
  role: z.enum(USER_ROLE).optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  secret: z.string().optional(),
  document: z.string().optional(),
})
export type updateUserType = z.infer<typeof updateUser>

export const removeUser = z.object({
  definitely: z.boolean().default(false).optional(),
})
export type removeUserType = z.infer<typeof removeUser>
