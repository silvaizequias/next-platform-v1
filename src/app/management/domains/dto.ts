import * as z from 'zod'

export const CreateDomainDTO = z.object({
  active: z.boolean().default(true).optional(),
  subscriber: z.boolean().default(false).optional(),
  suspended: z.boolean().default(false).optional(),
  organization: z.string().min(11).max(14),
  authorization: z.string(),
})
export type CreateDomainDTOType = z.infer<typeof CreateDomainDTO>

export const UpdateDomainDTO = z.object({
  active: z.boolean().default(true).optional(),
  subscriber: z.boolean().default(false).optional(),
  suspended: z.boolean().default(false).optional(),
  organization: z.string().min(11).max(14).optional(),
  authorization: z.string().optional(),
})
export type UpdateDomainDTOType = z.infer<typeof UpdateDomainDTO>
