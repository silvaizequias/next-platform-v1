import * as z from 'zod'

export const ContactValidator = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  phone: z.string().min(10).max(13),
  message: z.string().min(10),
})
export type ContactValidatorType = z.infer<typeof ContactValidator>
