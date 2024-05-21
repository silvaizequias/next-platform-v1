import * as z from 'zod'

export const AddressValidation = z.object({
  zipCode: z.string().length(8),
  street: z.string(),
  complement: z.string(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type AddressValidationType = z.infer<typeof AddressValidation>
