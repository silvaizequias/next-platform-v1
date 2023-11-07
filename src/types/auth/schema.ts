import * as z from 'zod'

export const AuthSignIn = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(25),
})
export type AuthSignInType = z.infer<typeof AuthSignIn>
