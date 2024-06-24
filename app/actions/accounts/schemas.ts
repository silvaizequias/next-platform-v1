import * as z from 'zod'

const ACCOUNT_ROLE = ['master', 'user'] as const

export const CREATE = z.object({
  active: z.boolean().default(true).optional(),
  role: z.enum(ACCOUNT_ROLE),
  name: z.string().min(5),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(13),
  document: z.string().optional(),
  secret: z.string().optional(),
})

export const UPDATE = z.object({
  active: z.boolean().optional(),
  role: z.enum(ACCOUNT_ROLE).optional(),
  name: z.string().min(5).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(13).optional(),
  secret: z.string().optional(),
})
