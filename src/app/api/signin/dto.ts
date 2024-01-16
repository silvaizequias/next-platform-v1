import * as z from 'zod'

export const SignInDTO = z.object({
  phone: z.string().min(10).max(12),
  password: z.string().min(8).max(25),
})
export type SignInDTOType = z.infer<typeof SignInDTO>
