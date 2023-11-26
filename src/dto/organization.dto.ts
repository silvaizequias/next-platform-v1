import * as z from 'zod'

const ROLE = ['GUEST', 'CUSTOMER', 'MEMBER', 'ADMINISTRATOR', 'OWNER'] as const

export const OrganizationCreateDTO = z.object({
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
export type OrganizationCreateDTOType = z.infer<typeof OrganizationCreateDTO>

export const OrganizationUpdateDTO = z.object({
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
export type OrganizationUpdateDTOType = z.infer<typeof OrganizationUpdateDTO>

export const OrganizationUserCreateDTO = z.object({
  userEmail: z.string().email().optional(),
  organizationDocumentCode: z.string().length(14).optional(),
  role: z.enum(ROLE),
})
export type OrganizationUserCreateDTOType = z.infer<
  typeof OrganizationUserCreateDTO
>

export const OrganizationUserUpdateDTO = z.object({
  userEmail: z.string().email().optional(),
  organizationDocumentCode: z.string().length(14).optional(),
  isActive: z.boolean().optional(),
  role: z.enum(ROLE),
})
export type OrganizationUserUpdateDTOType = z.infer<
  typeof OrganizationUserUpdateDTO
>
