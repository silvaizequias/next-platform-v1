import * as z from 'zod'

export const LOGIN = z.object({
  phone: z.string().min(10).max(13),
  code: z.string().length(6),
})
