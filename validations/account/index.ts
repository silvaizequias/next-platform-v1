import { ACCOUNT_ROLE } from '@/helpers'
import * as z from 'zod'

export const AccountCreateValidation = z.object({
  active: z.boolean().default(true).optional(),
  role: z.enum(ACCOUNT_ROLE).default('customer'),
  name: z.string().min(5),
  image: z.string().optional(),
  phone: z.string().min(10).max(13),
  email: z.string().email(),
  document: z.string().optional(),
  zipCode: z.string().optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type AccountCreateValidationType = z.infer<
  typeof AccountCreateValidation
>

export const AccountUpdateValidation = z.object({
  active: z.boolean().optional(),
  role: z.enum(ACCOUNT_ROLE).optional(),
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
export type AccountUpdateValidationType = z.infer<
  typeof AccountUpdateValidation
>
