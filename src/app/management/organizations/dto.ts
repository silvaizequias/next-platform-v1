import * as z from 'zod'

export const CreateOrganizationDTO = z.object({
  active: z.boolean().default(true).optional(),
  name: z.string().min(5).max(140).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(14).optional(),
  documentCode: z.string().min(11).max(14),
  zipCode: z.string().length(8).optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type CreateOrganizationDTOType = z.infer<typeof CreateOrganizationDTO>

export const UpdateOrganizationDTO = z.object({
  active: z.boolean().default(true).optional(),
  name: z.string().min(5).max(140).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(14).optional(),
  documentCode: z.string().min(11).max(14).optional(),
  zipCode: z.string().length(8).optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type UpdateOrganizationDTOType = z.infer<typeof UpdateOrganizationDTO>
