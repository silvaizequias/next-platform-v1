import * as z from 'zod'

const SOLUTION = ['NONE'] as const

export const ServiceCreateSchema = z.object({
  isActive: z.boolean().default(true).optional(),
  name: z.string(),
  solution: z.enum(SOLUTION),
  description: z.string(),
  price: z.coerce.number().positive(),
})

export type ServiceCreateSchemaType = z.infer<typeof ServiceCreateSchema>

export const ServiceUpdateSchema = z.object({
  isActive: z.boolean().default(false).optional(),
  serviceCode: z.string().optional(),
  name: z.string().optional(),
  solution: z.enum(SOLUTION).optional(),
  description: z.string().optional(),
  price: z.coerce.number().positive().default(0),
})

export type ServiceUpdateSchemaType = z.infer<typeof ServiceUpdateSchema>
