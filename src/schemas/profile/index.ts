import * as z from 'zod'

const DOC_TYPE = ['CPF', 'CNPJ', 'RG', 'CNH', 'CTPS', 'PASSPORT'] as const

export const ProfileUpdateSchema = z.object({
  avatar: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  docType: z.enum(DOC_TYPE).default('CPF'),
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

export type ProfileUpdateSchemaType = z.infer<typeof ProfileUpdateSchema>

export const ProfilePasswordUpdateSchema = z.object({
  oldPassword: z.string().min(8).max(25),
  password: z.string().min(8).max(25),
})

export type ProfilePasswordUpdateSchemaType = z.infer<
  typeof ProfilePasswordUpdateSchema
>
