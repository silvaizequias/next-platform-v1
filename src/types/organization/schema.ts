import * as z from 'zod'

export const OrganizationCreateSchema = z.object({
  userDocCode: z.string().optional(),
  name: z.string(),
  cnpj: z.string().length(14),
  image: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  zipCode: z.string().length(8).optional(),
  complement: z.string().optional(),
})

export type OrganizationCreateSchemaType = z.infer<
  typeof OrganizationCreateSchema
>

export const OrganizationUpdateSchema = z.object({
  userDocCode: z.string().optional(),
  name: z.string().optional(),
  cnpj: z.string().length(14).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  zipCode: z.string().length(8).optional(),
  complement: z.string().optional(),
})

export type OrganizationUpdateSchemaType = z.infer<
  typeof OrganizationUpdateSchema
>
