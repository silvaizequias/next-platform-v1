import * as z from 'zod'

export const ResetPasswordSchema = z.object({
  phone: z.string().min(10).max(12),
})
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>
