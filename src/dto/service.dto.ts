import * as z from 'zod'

const RECURRENCE = ['MONTHLY', 'QUARTERLY', 'YEARLY'] as const

export const ServiceCreateDTO = z.object({
  name: z.string(),
  solution: z.string(),
  description: z.string(),
  features: z.string().optional(),
  price: z.coerce.number(),
  recurrence: z.enum(RECURRENCE).optional(),
})
export type ServiceCreateDTOType = z.infer<typeof ServiceCreateDTO>

export const ServiceUpdateDTO = z.object({
  name: z.string().optional(),
  solution: z.string().optional(),
  description: z.string().optional(),
  features: z.string().optional(),
  price: z.coerce.number().optional(),
  recurrence: z.enum(RECURRENCE).optional(),
})
export type ServiceUpdateDTOType = z.infer<typeof ServiceUpdateDTO>
