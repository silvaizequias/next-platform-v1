import { ServiceType } from '@/views/services/types'
import { UserType } from '@/views/users/types'

export interface ShowServicesBoxProps {
  user: UserType
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

export interface ShowMyServiceSubscriptionDetailProps {
  service: ServiceType
  onClose: () => void
}
