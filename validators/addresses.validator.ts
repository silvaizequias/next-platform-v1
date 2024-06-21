import * as z from 'zod'

export const AddressCreateValidator = z.object({
  zipCode: z.string().length(8),
  street: z.string(),
  complement: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type AddressCreateValidatorType = z.infer<typeof AddressCreateValidator>

export const AddressUpdateValidator = z.object({
  zipCode: z.string().length(8).optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type AddressUpdateValidatorType = z.infer<typeof AddressUpdateValidator>
