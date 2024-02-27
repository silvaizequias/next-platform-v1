import * as z from 'zod'

const METHOD = ['GET', 'POST', 'PATCH', 'DELETE'] as const

export const CreateApiSpendSchema = z.object({
  document: z.string(),
  method: z.enum(METHOD),
  pathname: z.string().optional(),
  url: z.string().optional(),
  userAgent: z.string().optional(),
})
export type CreateApiSpendSchemaType = z.infer<typeof CreateApiSpendSchema>
