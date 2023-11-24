import * as z from 'zod'

const PROFILE = ['USER', 'MASTER'] as const

export const UserCreateDTO = z.object({
  profile: z.enum(PROFILE).optional(),
  name: z.string().min(5).max(255),
  image: z.string().optional(),
  email: z.string().email(),
  phone: z.string().length(11),
  password: z.string().min(8).max(25).optional(),
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
export type UserCreateDTOType = z.infer<typeof UserCreateDTO>

export const UserUpdateDTO = z.object({
  isActive: z.boolean().optional(),
  profile: z.enum(PROFILE).optional(),
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
export type UserUpdateDTOType = z.infer<typeof UserUpdateDTO>

export const UserPasswordUpdateDTO = z.object({
  password: z.string().min(8).max(25),
  newPassword: z.string().min(8).max(25),
})
export type UserPasswordUpdateDTOType = z.infer<typeof UserPasswordUpdateDTO>