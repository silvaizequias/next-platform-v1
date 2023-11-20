import * as z from 'zod'

const ROLE = ['GUEST', 'CUSTOMER', 'MEMBER', 'ADMINISTRATOR', 'OWNER'] as const

export const OrganziationCreateSchema = z.object({
  name: z.string().min(5).max(255),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  documentCode: z.string().length(14),
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
export type OrganizationCreateSchemaType = z.infer<
  typeof OrganziationCreateSchema
>

export const OrganizationUpdateSchema = z.object({
  name: z.string().min(5).max(255).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  documentCode: z.string().length(14).optional(),
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
export type OrganizationUpdateSchemaType = z.infer<
  typeof OrganizationUpdateSchema
>

export const OrganizationUserCreateSchema = z.object({
  userPhone: z.string().length(11).optional(),
  organizationDocumentCode: z.string().length(14).optional(),
  role: z.enum(ROLE),
})
export type OrganizationUserCreateSchemaType = z.infer<
  typeof OrganizationUserCreateSchema
>

export const OrganizationUserUpdateSchema = z.object({
  userPhone: z.string().length(11).optional(),
  organizationDocumentCode: z.string().length(14).optional(),
  isActive: z.boolean().optional(),
  role: z.enum(ROLE),
})
export type OrganizationUserUpdateSchemaType = z.infer<
  typeof OrganizationUserUpdateSchema
>
