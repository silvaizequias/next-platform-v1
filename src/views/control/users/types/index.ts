import { ServiceType } from '@/views/control/services/types'
import { AccountType, SessionType } from '@/types'
import { ArticleType } from '@/views/blog/types'
import { SubscriptionType } from '@/views/control/subscriptions/types'
import { CompanyType } from '@/views/control/companies/types'

export type UserType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  isActive: boolean
  role:
    | 'MASTER'
    | 'ADMINISTRATOR'
    | 'SUPERVISOR'
    | 'ANALYST'
    | 'INSTRUCTOR'
    | 'TECHNICIAN'
    | 'DRIVER'
    | 'USER'
  profile: 'OWNER' | 'MEMBER' | 'CUSTOMER' | 'GUEST'
  name: string
  email: string
  emailVerified: Date
  image: string
  phone: string
  docType: 'CPF' | 'CNPJ' | 'CNH' | 'CTPS' | 'PASSPORT'
  docCode: string
  zipCode: string
  complement: string
  accounts: AccountType[]
  services: ServiceType[]
  sessions: SessionType[]
  subscriptions: SubscriptionType[]
  articles: ArticleType[]
  companies: CompanyType[]
}

export interface UserDataGridProps {
  users: UserType[]
}

export interface UserCreateFormProps {
  onClose: () => void
}
