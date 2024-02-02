import * as z from 'zod'

export const SignUpSchema = z.object({
  name: z.string(),
  phone: z.string().min(10).max(12),
  email: z.string().email(),
  password: z.string().optional(),
})
export type SignUpSchemaType = z.infer<typeof SignUpSchema>
