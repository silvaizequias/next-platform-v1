import * as z from 'zod'

const METHOD = ['GET', 'POST', 'PATCH', 'DELETE'] as const

export const ApiHanlderValidator = z.object({
  cache: z.coerce.number().positive().optional(),
  id: z.string().optional(),
  inputs: z.any().optional(),
  method: z.enum(METHOD),
  path: z.string(),
  revalidate: z.string().optional(),
  tag: z.string(),
})
export type ApiHanlderValidatorType = z.infer<typeof ApiHanlderValidator>
