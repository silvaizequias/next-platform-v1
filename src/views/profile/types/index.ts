export type ProfileType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
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

export interface ProfileImageUploadFormProps {
  onClose: () => void
  profile: ProfileType
}
