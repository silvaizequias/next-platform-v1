import { removeOrganization } from '@/repositories/organizations/DELETE'
import {
  findAllOrganizations,
  findOrganizationByDocument,
  findOrganizationById,
} from '@/repositories/organizations/GET'
import { updateOrganization } from '@/repositories/organizations/PATCH'
import { createOrganization } from '@/repositories/organizations/POST'
import {
  OrganizationCreateValidatorType,
  OrganizationUpdateValidatorType,
} from '@/validators/organizations.validator'

export default class OrganizationsService {
  create(data: OrganizationCreateValidatorType) {
    return createOrganization(data)
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

  update(id: string, data: OrganizationUpdateValidatorType) {
    return updateOrganization(id, data)
  }

  remove(id: string, definitely: boolean) {
    return removeOrganization(id, definitely)
  }
}
