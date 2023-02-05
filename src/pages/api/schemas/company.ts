import { boolean, number, object, string, TypeOf } from 'yup'

export const companySchema = object({
  isActive: boolean().optional().default(true),
  token: string().optional(),
  cnpj: string().required().min(11).max(18),
  logo: string().optional().default('/logo/500x500-logotipo1.png'),
  name: string().required().max(200),
  domain: string().optional(),
  stateReg: string().optional(),
  municipalReg: string().optional(),
  phone: string().optional(),
  email: string().optional().email(),
  segment: string().optional(),
  description: string().optional(),
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

export type Company = TypeOf<typeof companySchema>
