import * as z from 'zod'

export const OrganizationCreateValidation = z.object({
  active: z.boolean().default(true).optional(),
  name: z.string().min(5),
  image: z.string().optional(),
  phone: z.string().min(10).max(13).optional(),
  email: z.string().email().optional(),
  document: z.string().optional(),
  zipCode: z.string().optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type OrganizationCreateValidationType = z.infer<
  typeof OrganizationCreateValidation
>

export const OrganizationUpdateValidation = z.object({
  active: z.boolean().default(true).optional(),
  name: z.string().min(5).optional(),
  image: z.string().optional(),
  phone: z.string().min(10).max(13).optional(),
  email: z.string().email().optional(),
  document: z.string().optional(),
  zipCode: z.string().optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type OrganizationUpdateValidationType = z.infer<
  typeof OrganizationUpdateValidation
>
