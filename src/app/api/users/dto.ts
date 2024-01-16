import * as z from 'zod'

const PROFILE = ['guest', 'consumer', 'member', 'master'] as const
const DOCUMENT_TYPE = ['cpf', 'cnpj'] as const

export const CreateUserDTO = z.object({
  active: z.boolean().default(true).optional(),
  subscriber: z.boolean().default(false).optional(),
  api: z.string().optional(),
  profile: z.enum(PROFILE).default('guest').optional(),
  name: z.string().min(5).max(140).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(14),
  documentType: z.enum(DOCUMENT_TYPE).default('cpf').optional(),
  documentCode: z.string().min(11).max(14).optional(),
  password: z.string().min(8).max(25).optional(),
  accessCode: z.string().optional(),
  zipCode: z.string().length(8).optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type CreateUserDTOType = z.infer<typeof CreateUserDTO>

export const UpdateUserDTO = z.object({
  active: z.boolean().optional(),
  subscriber: z.boolean().optional(),
  suspended: z.boolean().optional(),
  api: z.string().optional(),
  profile: z.enum(PROFILE).optional(),
  name: z.string().min(5).max(140).optional(),
  image: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(14).optional(),
  documentType: z.enum(DOCUMENT_TYPE).optional(),
  documentCode: z.string().min(11).max(14).optional(),
  password: z.string().min(8).max(25).optional(),
  accessCode: z.string().optional(),
  zipCode: z.string().length(8).optional(),
  street: z.string().optional(),
  complement: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type UpdateUserDTOType = z.infer<typeof UpdateUserDTO>
