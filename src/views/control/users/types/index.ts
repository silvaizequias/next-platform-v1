import { AccountType, SessionType } from '@/types'
import { SubscriptionType } from '@/views/control/subscriptions/types'

export type UserType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  isActive: boolean
  role: 'MASTER' | 'MEMBER' | 'CUSTOMER' | 'GUEST'
  name: string
  email: string
  emailVerified: Date
  image: string
  phone: string
  docType: 'CPF' | 'CNPJ' | 'CNH' | 'CTPS' | 'PASSPORT'
  docCode: string
  accounts: AccountType[]
  sessions: SessionType[]
  subscriptions: SubscriptionType[]
}

export interface UserDataGridProps {
  users: UserType[]
}

export interface UserCreateFormProps {
  onClose: () => void
}
