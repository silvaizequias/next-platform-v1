import * as z from 'zod'

const ROLE = [
  'client',
  'assistant',
  'technician',
  'administrator',
  'owner',
] as const

export const CreateOrganizationUserDTO = z.object({
  active: z.boolean().optional(),
  role: z.enum(ROLE).optional().default('client'),
  userPhone: z.string().optional(),
  organizationDocument: z.string().optional(),
})
export type CreateOrganizationUserDTOType = z.infer<
  typeof CreateOrganizationUserDTO
>

export const UpdateOrganizationUserDTO = z.object({
  active: z.boolean().optional(),
  role: z.enum(ROLE).optional(),
  userPhone: z.string().optional(),
  organizationDocument: z.string().optional(),
})
export type UpdateOrganizationUserDTOType = z.infer<
  typeof UpdateOrganizationUserDTO
>

export const CreateOrganizationDTO = z.object({
  active: z.boolean().default(true).optional(),
  name: z.string().min(5).max(140).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(14).optional(),
  document: z.string().min(11).max(14),
  zipCode: z.string().length(8).optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type CreateOrganizationDTOType = z.infer<typeof CreateOrganizationDTO>

export const UpdateOrganizationDTO = z.object({
  active: z.boolean().optional(),
  name: z.string().min(5).max(140).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(14).optional(),
  document: z.string().min(11).max(14).optional(),
  zipCode: z.string().length(8).optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type UpdateOrganizationDTOType = z.infer<typeof UpdateOrganizationDTO>
