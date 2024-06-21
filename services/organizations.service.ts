import { removeOrganization } from '@/repositories/organizations/DELETE'
import {
  findAllOrganizations,
  findOrganizationByDocument,
  findOrganizationById,
} from '@/repositories/organizations/GET'
import { updateOrganization } from '@/repositories/organizations/PATCH'
import { createOrganization } from '@/repositories/organizations/POST'

export default class OrganizationsService {
  create() {
    return createOrganization()
  }

  findAll() {
    return findAllOrganizations()
  }

  findById(id: string) {
    return findOrganizationById(id)
  }

  findByDocument(document: string) {
    return findOrganizationByDocument(document)
  }

  update(id: string) {
    return updateOrganization(id)
  }

  remove(id: string, definitely: boolean) {
    return removeOrganization(id, definitely)
  }
}
