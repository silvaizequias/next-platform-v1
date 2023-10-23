import * as z from 'zod'

export const AuthSignIn = z.object({
  email: z.string().email(),
  phone: z.string().length(11),
})
export type AuthSignInType = z.infer<typeof AuthSignIn>
