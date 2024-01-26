import * as z from 'zod'

const defaultOrganization = '52378516000178'

export const SignUpDTO = z.object({
  organizationDocument: z.string().default(defaultOrganization).optional(),
  name: z.string().min(5).max(140).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(14),
  password: z.string().min(8).max(25).optional(),
})
export type SignUpDTOType = z.infer<typeof SignUpDTO>
