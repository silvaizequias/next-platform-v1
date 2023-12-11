import * as z from 'zod'

export const SignUpDTO = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  phone: z.string().length(11),
  password: z.string().min(8).max(25).optional(),
})
export type SignUpDTOType = z.infer<typeof SignUpDTO>
