import { ServiceType } from './../../services/types/index'
import { UserType } from './../../users/types/index'
export type UsersAndServicesType = {
  userId: string
  user: UserType
  serviceId: string
  service: ServiceType
  isActive: boolean
  role:
    | 'ADMINISTRATOR'
    | 'MANAGER'
    | 'SUPERVISOR'
    | 'ANALYST'
    | 'INSTRUCTOR'
    | 'TECHNICIAN'
    | 'DRIVER'
    | 'USER'
}
