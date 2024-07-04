import * as z from 'zod'

const promise = z.object({
  status: z.coerce.number().default(200).optional(),
  success: z.boolean().default(true).optional(),
  message: z.string().default('succeeded').optional(),
  response: z.any().nullable().optional(),
  errors: z.any().nullable().optional(),
})
export type callbackPromise = z.infer<typeof promise>
