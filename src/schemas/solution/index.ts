import * as z from 'zod'

export const SolutionCreateSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  cloud: z.string(),
  isActive: z.boolean().default(true),
})

export type SolutionCreateSchemaType = z.infer<typeof SolutionCreateSchema>

export const SolutionUpdateSchema = z.object({
  name: z.string().optional(),
  url: z.string().url().optional(),
  cloud: z.string().optional(),
  isActive: z.boolean().optional(),
})

export type SolutionUpdateSchemaType = z.infer<typeof SolutionUpdateSchema>
