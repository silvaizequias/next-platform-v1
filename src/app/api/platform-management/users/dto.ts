import * as z from 'zod'

const PROFILE = ['USER', 'MASTER'] as const

export const CreateUserDTO = z.object({
  isActive: z.boolean().optional(),
  profile: z.enum(PROFILE),
  name: z.string().min(5),
  image: z.string().optional(),
  email: z.string().email(),
  phone: z.string().length(11),
  documentCode: z.string().optional(),
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
export type CreateUserDTOType = z.infer<typeof CreateUserDTO>

export const UpdateUserDTO = z.object({
  isActive: z.boolean().optional(),
  profile: z.enum(PROFILE).optional(),
  name: z.string().min(5).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().length(11).optional(),
  documentCode: z.string().optional(),
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
export type UpdateUserDTOType = z.infer<typeof UpdateUserDTO>
