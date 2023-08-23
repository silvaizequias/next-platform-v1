export type ProfileType = {
  id: string
  avatar: string
  name: string
  email: string
  phone: string
  docType: 'CPF' | 'CNPJ' | 'CNH' | 'CTPS' | 'PASSPORT'
  docCode: string
  zipCode: string
  street: string
  number: string
  complement: string
  zone: string
  district: string
  city: string
  state: string
}

export interface ProfileProps {
  profile: ProfileType
}