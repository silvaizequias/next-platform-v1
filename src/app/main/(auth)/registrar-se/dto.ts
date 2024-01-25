import * as z from 'zod'

export const SignUpDTO = z.object({
  name: z.string().min(5).max(140).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(14),
  password: z.string().min(8).max(25).optional(),
})
export type SignUpDTOType = z.infer<typeof SignUpDTO>
