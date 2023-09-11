import { ServiceType } from '@/views/control/services/types'
import { UserType } from '@/views/control/users/types'

export interface ShowServicesProps {
  service: ServiceType
  user: UserType
}

export interface ServiceSubscribeProps {
  service: ServiceType
  user: UserType
  onClose: () => void
}
