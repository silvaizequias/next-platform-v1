import * as z from 'zod'

export const RegisterSchema = z.object({
  organizationDocument: z.string().length(14).optional(),
  name: z.string().min(5),
  email: z.string().email(),
  phone: z.string().length(11),
  password: z.string().min(8).max(25).optional(),
})
export type RegisterSchemaType = z.infer<typeof RegisterSchema>
