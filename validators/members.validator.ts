import * as z from 'zod'

export const MemberCreateValidator = z.object({
  role: z.string(),
  active: z.boolean().default(true).optional(),
  accountId: z.string(),
  organizationId: z.string(),
})
export type MemberCreateValidatorType = z.infer<typeof MemberCreateValidator>

export const MemberUpdateValidator = z.object({
  role: z.string().optional(),
  active: z.boolean().optional(),
  accountId: z.string().optional(),
  organizationId: z.string().optional(),
})
export type MemberUpdateValidatorType = z.infer<typeof MemberUpdateValidator>
