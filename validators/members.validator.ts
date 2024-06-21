import * as z from 'zod'

export const MEMBER_ROLE = [
  'owner',
  'administrator',
  'customer',
  'guest',
] as const

export const MemberCreateValidator = z.object({
  role: z.enum(MEMBER_ROLE),
  active: z.boolean().default(true).optional(),
  accountId: z.string(),
  organizationId: z.string(),
})
export type MemberCreateValidatorType = z.infer<typeof MemberCreateValidator>

export const MemberUpdateValidator = z.object({
  role: z.enum(MEMBER_ROLE).optional(),
  active: z.boolean().optional(),
  accountId: z.string().optional(),
  organizationId: z.string().optional(),
})
export type MemberUpdateValidatorType = z.infer<typeof MemberUpdateValidator>
