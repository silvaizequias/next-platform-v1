import { OrganizationType } from '../organization'
import { SolutionType } from '../solution'

export type SolutionOfOrganizationType = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  softDeleted: string
  solutionId: string
  solution: SolutionType
  organizationId: string
  organization: OrganizationType
  isActive: boolean
}
