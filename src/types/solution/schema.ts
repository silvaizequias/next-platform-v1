import * as z from 'zod'

export const SolutionCreateSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
  price: z.coerce.number().positive(),
})

export type SolutionCreateSchemaType = z.infer<typeof SolutionCreateSchema>

export const SolutionUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional(),
  price: z.coerce.number().positive().optional(),
})

export type SolutionUpdateSchemaType = z.infer<typeof SolutionUpdateSchema>
