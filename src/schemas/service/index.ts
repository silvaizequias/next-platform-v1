import * as z from 'zod'

export const ServiceCreateSchema = z.object({
  isAvaliable: z.boolean().default(true).optional(),
  name: z.string(),
  description: z.string(),
  solution: z.string().optional(),
  url: z.string().url().optional(),
  price: z.coerce.number().positive(),
})

export type ServiceCreateSchemaType = z.infer<typeof ServiceCreateSchema>

export const ServiceUpdateSchema = z.object({
  isAvaliable: z.boolean().default(false).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  solution: z.string().optional(),
  url: z.string().url().optional(),
  price: z.coerce.number().positive().default(0),
})

export type ServiceUpdateSchemaType = z.infer<typeof ServiceUpdateSchema>
