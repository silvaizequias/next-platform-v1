import * as z from 'zod'

export const CreateOrganization = z.object({
  name: z.string().min(5).max(255),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().length(11).optional(),
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
export type CreateOrganizationType = z.infer<typeof CreateOrganization>

export const UpdateOrganization = z.object({
  name: z.string().min(5).max(255).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().length(11).optional(),
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
export type UpdateOrganizationType = z.infer<typeof UpdateOrganization>
