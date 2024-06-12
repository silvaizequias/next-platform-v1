import { MEMBER_ROLE } from '@/helpers'
import * as z from 'zod'

export const MemberCreateValidation = z.object({
  active: z.boolean().default(true).optional(),
  role: z.enum(MEMBER_ROLE).default('customer'),
  organization: z.string(),
  account: z.string(),
})
export type MemberCreateValidationType = z.infer<typeof MemberCreateValidation>

export const MemberUpdateValidation = z.object({
  active: z.boolean().optional(),
  role: z.enum(MEMBER_ROLE).optional(),
  organization: z.string().optional(),
  account: z.string().optional(),
})
export type MemberUpdateValidationType = z.infer<typeof MemberUpdateValidation>
