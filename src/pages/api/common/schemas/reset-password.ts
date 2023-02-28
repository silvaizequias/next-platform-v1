import { object, string, TypeOf } from 'yup'

export const resetPasswordSchema = object({
  email: string().required().email().max(200),
  phone: string().required(),
})

export type ResetPassword = TypeOf<typeof resetPasswordSchema>