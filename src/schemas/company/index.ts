import * as z from 'zod'

export const CompanyCreateSchema = z.object({
  userId: z.string().optional(),
  name: z.string(),
  image: z.string().optional(),
  email: z.string().email(),
  phone: z.string().length(11),
  cnpj: z.string().length(14),
  zipCode: z.string().length(8).optional(),
  complement: z.string().optional(),
})

export type CompanyCreateSchemaType = z.infer<typeof CompanyCreateSchema>

export const CompanyUpdateSchema = z.object({
  userId: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().length(11).optional(),
  cnpj: z.string().length(14).optional(),
  zipCode: z.string().length(8).optional(),
  complement: z.string().optional(),
})

export type CompanyUpdateSchemaType = z.infer<typeof CompanyUpdateSchema>
