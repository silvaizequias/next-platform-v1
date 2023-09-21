import * as z from 'zod'

const PROFILE = ['MASTER', 'OWNER', 'MEMBER', 'CUSTOMER', 'GUEST'] as const
const DOCUMENT = ['CPF', 'CNPJ', 'RG', 'CNH', 'CTPS', 'PASSPORT'] as const

export const UserCreateSchema = z.object({
  profile: z.enum(PROFILE).default('GUEST').optional(),
  isActive: z.boolean().default(true).optional(),
  name: z.string(),
  email: z.string().email(),
  image: z.string().optional(),
  phone: z.string(),
  password: z.string().min(8).max(24).optional(),
  docType: z.enum(DOCUMENT).default('CPF').optional(),
  docCode: z.string().optional(),
  zipCode: z.string().length(8).optional(),
  complement: z.string().optional(),
})

export type UserCreateSchemaType = z.infer<typeof UserCreateSchema>

export const UserUpdateSchema = z.object({
  profile: z.enum(PROFILE).default('GUEST').optional(),
  isActive: z.boolean().default(true).optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().min(8).max(24).optional(),
  docType: z.enum(DOCUMENT).default('CPF').optional(),
  docCode: z.string().optional(),
  zipCode: z.string().length(8).optional(),
  complement: z.string().optional(),
})

export type UserUpdateSchemaType = z.infer<typeof UserUpdateSchema>
