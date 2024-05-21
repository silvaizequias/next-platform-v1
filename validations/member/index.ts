import * as z from 'zod'

const ROLE = [
  'client',
  'assistant',
  'technician',
  'administrator',
  'owner',
] as const

export const MemberCreateValidation = z.object({
  active: z.boolean().optional(),
  available: z.boolean().optional(),
  role: z.enum(ROLE),
  userPhone: z.string().min(10).max(14),
  organizationDocument: z.string().length(14),
})
export type MemberCreateValidationType = z.infer<typeof MemberCreateValidation>

export const MemberUpdateValidation = z.object({
  active: z.boolean().optional(),
  available: z.boolean().optional(),
  role: z.enum(ROLE).optional(),
  userPhone: z.string().min(10).max(14).optional(),
  organizationDocument: z.string().length(14).optional(),
})
export type MemberUpdateValidationType = z.infer<typeof MemberUpdateValidation>

export const MemberImportValidation = z.object({})
export type MemberImportValidationType = z.infer<typeof MemberImportValidation>
