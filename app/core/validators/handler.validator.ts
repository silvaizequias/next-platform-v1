import * as z from 'zod'

export const handler = z.object({
  cache: z.coerce.number().default(120).optional(),
  endpoint: z.string().optional(),
  id: z.string().optional(),
  inputs: z.any().optional(),
  path: z.string(),
  revalidate: z.string().optional(),
  tag: z.string(),
  token: z.string().optional(),
})
export type handlerType = z.infer<typeof handler>
