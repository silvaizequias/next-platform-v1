import { ServiceType } from '@/views/services/types'
import { UserType } from '@/views/users/types'

export interface ShowServicesBoxProps {
  user: UserType
}

export interface SubscriptionServiceCardProps {
  service: ServiceType
  user: UserType
}

export interface ShowServicesSubscriptionBoxProps {}
