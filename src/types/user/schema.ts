import * as z from 'zod'

const PROFILE = ['MASTER', 'OWNER', 'MEMBER', 'CUSTOMER', 'GUEST'] as const
const DOCUMENT = ['CPF', 'CNPJ', 'RG', 'CNH', 'CTPS', 'PASSPORT'] as const

export const UserCreateSchema = z.object({
  profile: z.enum(PROFILE).default('GUEST').optional(),
  isActive: z.boolean().default(true).optional(),
  name: z.string(),
  email: z.string().email(),
  image: z.string().optional(),
  phone: z.string().length(11),
  password: z.string().min(8).max(24).optional(),
  docType: z.enum(DOCUMENT).default('CPF').optional(),
  docCode: z.string().optional(),
  zipCode: z.string().length(8).optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type UserCreateSchemaType = z.infer<typeof UserCreateSchema>

export const UserUpdateSchema = z.object({
  profile: z.enum(PROFILE).default('GUEST').optional(),
  isActive: z.boolean().default(true).optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
  phone: z.string().length(11).optional(),
  password: z.string().min(8).max(24).optional(),
  docType: z.enum(DOCUMENT).default('CPF').optional(),
  docCode: z.string().optional(),
  zipCode: z.string().length(8).optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type UserUpdateSchemaType = z.infer<typeof UserUpdateSchema>

export const UserAddressUpdateSchema = z.object({
  zipCode: z.string().length(8),
  street: z.string().optional(),
  complement: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type UserAddressUpdateSchemaType = z.infer<
  typeof UserAddressUpdateSchema
>

export const UserInformationUpdateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().length(11),
  docType: z.enum(DOCUMENT),
  docCode: z.string(),
})
export type UserInformationUpdateSchemaType = z.infer<
  typeof UserInformationUpdateSchema
>

export const UserPasswordSettingSchema = z
  .object({
    password: z.string().min(8).max(24),
    confirmPassword: z.string().min(8).max(24),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'senha não foi validada!',
    path: ['confirmPassword'],
  })
export type UserPasswordSettingSchemaType = z.infer<
  typeof UserPasswordSettingSchema
>

export const UserPasswordUpdateSchema = z
  .object({
    password: z.string().min(8).max(24),
    newPassword: z.string().min(8).max(24),
    confirmNewPassword: z.string().min(8).max(24),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'a nova senha não foi validada!',
    path: ['confirmNewPassword'],
  })
export type UserPasswordUpdateSchemaType = z.infer<
  typeof UserPasswordUpdateSchema
>
