import { boolean, number, object, string, TypeOf } from 'yup'

export const userSchema = object({
  acceptedTerms: boolean().required().default(true),
  isActive: boolean().required().default(true),
  role: string().optional().default('GUEST'),
  avatar: string().optional(),
  name: string().required().min(5).max(200),
  email: string().required().email().max(200),
  phone: string().required(),
  docType: string().optional(),
  docCode: string().optional(),
  passToken: string().optional(),
  zipCode: number().positive().required(),
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
