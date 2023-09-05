import * as z from 'zod'

const ROLE = ['MASTER', 'MEMBER', 'CUSTOMER', 'GUEST'] as const
const DOC_TYPE = ['CPF', 'CNPJ', 'RG', 'CNH', 'CTPS', 'PASSPORT'] as const

export const UserCreateSchema = z.object({
  isVerified: z.boolean().default(false).optional(),
  isActive: z.boolean().default(false).optional(),
  role: z.enum(ROLE),
  image: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().length(11),
  docType: z.enum(DOC_TYPE).default('CPF').optional(),
  docCode: z.string().optional(),
  zipCode: z.string().length(8).optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  zone: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
})

export type UserCreateSchemaType = z.infer<typeof UserCreateSchema>

export const UserUpdateSchema = z.object({
  isVerified: z.boolean().default(false).optional(),
  isActive: z.boolean().default(false).optional(),
  role: z.enum(ROLE).optional(),
  image: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  docType: z.enum(DOC_TYPE).optional(),
  docCode: z.string().optional(),
  zipCode: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  zone: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
})

export type UserUpdateSchemaType = z.infer<typeof UserUpdateSchema>

export const UserPasswordUpdateSchema = z.object({
  password: z.string().min(8).max(25),
})

export type UserPasswordUpdateSchemaType = z.infer<
  typeof UserPasswordUpdateSchema
>
