import * as z from 'zod'

export const createMember = z.object({
  userPhone: z.string().optional(),
  organizationDocument: z.string().optional(),
  role: z.string(),
  active: z.boolean().default(true).optional(),
})
export type createMemberType = z.infer<typeof createMember>

export const updateMember = z.object({
  role: z.string().optional(),
  active: z.boolean().optional(),
})
export type updateMemberType = z.infer<typeof updateMember>

export const removeMember = z.object({
  definitely: z.boolean().default(false).optional(),
})
export type removeMemberType = z.infer<typeof removeMember>
