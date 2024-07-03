import * as z from 'zod'

export const createOrganization = z.object({})
export type createOrganizationType = z.infer<typeof createOrganization>

export const updateOrganization = z.object({})
export type updateOrganizationType = z.infer<typeof updateOrganization>
