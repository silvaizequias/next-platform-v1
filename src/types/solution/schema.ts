import * as z from 'zod'

export const SolutionCreateSchema = z.object({})

export type SolutionCreateSchemaType = z.infer<typeof SolutionCreateSchema>

export const SolutionUpdateSchema = z.object({})

export type SolutionUpdateSchemaType = z.infer<typeof SolutionUpdateSchema>
