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
  organizationId: OrganizationType
  isActive: boolean
}
