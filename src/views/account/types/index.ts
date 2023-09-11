import { ServiceType } from '@/views/control/services/types'
import { UserType } from '@/views/control/users/types'

export interface ShowServicesBoxProps {
  user: UserType | undefined
}

export interface SubscriptionServiceCardProps {
  service: ServiceType
  user: UserType
}

export interface ServiceSubscriptionDetailsProps {
  service: ServiceType
  user: UserType
  onClose: () => void
}

export interface ShowServicesSubscriptionBoxProps {
  user: UserType | undefined
}

