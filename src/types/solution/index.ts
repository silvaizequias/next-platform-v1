import { ContractType } from '../contract'
import { SolutionOfOrganizationType } from '../solution-of-organization'

export type SolutionType = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  softDeleted: string
  name: string
  description: string
  url: string
  price: number
  contracts: ContractType[]
  organizations: SolutionOfOrganizationType[]
}
