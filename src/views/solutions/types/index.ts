import { ServiceType } from '@/views/services/types'

export type SolutionType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  name: string
  url: string
  cloud: string
  isActive: boolean
  services: ServiceType[]
}

export interface SolutionCreateFormProps {
  onClose: () => void
}
