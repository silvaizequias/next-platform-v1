import * as z from 'zod'

export const CreateOrganizationDTO = z.object({
  isActive: z.boolean().optional(),
  name: z.string().min(5),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(11).optional(),
  documentCode: z.string(),
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
export type CreateOrganizationDTOType = z.infer<typeof CreateOrganizationDTO>

export const UpdateOrganizationDTO = z.object({
  isActive: z.boolean().optional(),
  name: z.string().min(5).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(11).optional(),
  documentCode: z.string().optional(),
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
export type UpdateOrganizationDTOType = z.infer<typeof UpdateOrganizationDTO>
