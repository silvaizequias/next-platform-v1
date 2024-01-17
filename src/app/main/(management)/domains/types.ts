import { PublicationType } from '../publications/types'

export type DomainType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  subscriber: boolean
  suspended: boolean
  organization: string
  authorization: string
  publications?: PublicationType[]
}
