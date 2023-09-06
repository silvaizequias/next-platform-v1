import * as z from 'zod'

const SOLUTION = ['NONE'] as const

export const ServiceCreateSchema = z.object({
  isAvaliable: z.boolean().default(true).optional(),
  name: z.string(),
  solutionId: z.string().optional(),
  description: z.string(),
  price: z.coerce.number().positive(),
})

export type ServiceCreateSchemaType = z.infer<typeof ServiceCreateSchema>

export const ServiceUpdateSchema = z.object({
  isAvaliable: z.boolean().default(false).optional(),
  name: z.string().optional(),
  solutionId: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().positive().default(0),
})

export type ServiceUpdateSchemaType = z.infer<typeof ServiceUpdateSchema>
