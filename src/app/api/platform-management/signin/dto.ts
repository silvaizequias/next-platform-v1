import * as z from 'zod'

export const SignInDTO = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(25),
})
export type SignInDTOType = z.infer<typeof SignInDTO>
