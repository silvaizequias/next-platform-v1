import * as z from 'zod'

export const LoginValidation = z.object({
  phone: z.string().min(10).max(13),
  secret: z.string().length(6).optional(),
})
export type LoginValidationType = z.infer<typeof LoginValidation>
