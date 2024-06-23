import * as z from 'zod'

const MEMBER_ROLE = ['owner', 'administrator', 'customer', 'guest'] as const

export const CREATE = z.object({
  role: z.enum(MEMBER_ROLE),
  active: z.boolean().default(true).optional(),
  accountId: z.string(),
  organizationId: z.string(),
})

export const UPDATE = z.object({
  role: z.enum(MEMBER_ROLE).optional(),
  active: z.boolean().optional(),
  accountId: z.string().optional(),
  organizationId: z.string().optional(),
})
