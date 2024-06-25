import * as z from 'zod'

export const CREATE = z.object({
  active: z.boolean().default(true).optional(),
  name: z.string().min(5),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(13).optional(),
  document: z.string(),
})

export const UPDATE = z.object({
  active: z.boolean().optional(),
  name: z.string().min(5).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(13).optional(),
})
