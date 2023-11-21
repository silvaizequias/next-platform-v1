import * as z from 'zod'

export const AuthSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(25),
})
export type AuthSignInSchemaType = z.infer<typeof AuthSignInSchema>

export const AuthSignUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().length(11),
  password: z.string().min(8).max(25).optional()
})
export type AuthSignUpSchemaType = z.infer<typeof AuthSignUpSchema>

export const AuthForgotPasswordSchema = z.object({
  email: z.string().email(),
  phone: z.string().length(11),
})
export type AuthForgotPasswordSchemaType = z.infer<
  typeof AuthForgotPasswordSchema
>
