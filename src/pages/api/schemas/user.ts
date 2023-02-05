import { boolean, number, object, string, TypeOf } from 'yup'

export const userSchema = object({
  companyCnpj: string().required().min(11).max(18),
  isActive: boolean().optional().default(true),
  token: string().optional(),
  role: string().optional().default('guest'),
  avatar: string().optional().default('/user-undefined.png'),
  name: string().required().min(5).max(200),
  phone: string().required().min(11).max(11),
  email: string().required().email().max(200),
  docType: string().optional().default('cpf'),
  docCode: string().optional(),
  zipCode: string().required().min(8).max(8),
  street: string().optional(),
  number: string().optional(),
  complement: string().optional(),
  zone: string().optional(),
  district: string().optional(),
  city: string().optional(),
  state: string().optional(),
  lat: number().optional(),
  long: number().optional()
})

export type User = TypeOf<typeof userSchema>
