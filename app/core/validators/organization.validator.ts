import * as z from 'zod'

export const createOrganization = z.object({
  active: z.boolean().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  document: z.string(),
})
export type createOrganizationType = z.infer<typeof createOrganization>

export const updateOrganization = z.object({
  active: z.boolean().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
})
export type updateOrganizationType = z.infer<typeof updateOrganization>

export const removeOrganization = z.object({
  definitely: z.boolean().default(false).optional(),
})
export type removeOrganizationType = z.infer<typeof removeOrganization>
