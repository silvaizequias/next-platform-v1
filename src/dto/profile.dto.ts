import * as z from 'zod'

export const ProfilePasswordUpdateDTO = z.object({
  password: z.string().min(8).max(25),
  newPassword: z.string().min(8).max(25),
})
export type ProfilePasswordUpdateDTOType = z.infer<
  typeof ProfilePasswordUpdateDTO
>

export const ProfileUpdateDTO = z.object({
  name: z.string().min(5).max(255).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().length(11).optional(),
  documentCode: z.string().min(5).max(25).optional(),
  zipCode: z.string().length(8).optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type ProfileUpdateDTOType = z.infer<typeof ProfileUpdateDTO>
