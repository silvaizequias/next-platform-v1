import * as z from 'zod'

export const OrganizationCreateValidator = z.object({
  active: z.boolean().default(true).optional(),
  name: z.string().min(5),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(13).optional(),
  document: z.string(),
})
export type OrganizationCreateValidatorType = z.infer<
  typeof OrganizationCreateValidator
>

export const OrganizationUpdateValidator = z.object({
  active: z.boolean().optional(),
  name: z.string().min(5).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(13).optional(),
})
export type OrganizationUpdateValidatorType = z.infer<
  typeof OrganizationUpdateValidator
>
