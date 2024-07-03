import * as z from 'zod'

export const createMember = z.object({})
export type createMemberType = z.infer<typeof createMember>

export const updateMember = z.object({})
export type updateMemberType = z.infer<typeof updateMember>
