import * as z from 'zod'

export const AuthSignInSchema = z.object({
  phone: z.string().length(11),
  password: z.string().min(6).max(25),
})

export type AuthSignInSchemaType = z.infer<typeof AuthSignInSchema>

export const AuthSignUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().length(11),
})

export type AuthSignUpSchemaType = z.infer<typeof AuthSignUpSchema>

export const AuthResetPassword = z
  .object({
    email: z.string().email(),
    phone: z.string().length(11),
  })
  .required()

export type AuthResetPasswordType = z.infer<typeof AuthResetPassword>
