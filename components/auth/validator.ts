import * as z from 'zod'

export const AuthLoginValidator = z.object({
  phone: z.string().min(10).max(13),
  code: z.string().length(6),
})
export type AuthLoginValidatorType = z.infer<typeof AuthLoginValidator>
