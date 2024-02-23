import * as z from 'zod'

export const LoginSchema = z.object({
  phone: z.string().min(10).max(12),
  password: z.string().min(8).max(25),
})
export type LoginSchemaType = z.infer<typeof LoginSchema>
