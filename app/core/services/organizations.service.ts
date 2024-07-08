import { repositoryCreateOrganization } from '../repositories/organizations/create'
import {
  repositoryFindAllOrganizations,
  repositoryFindByDocumentOrganization,
  repositoryFindOneOrganization,
} from '../repositories/organizations/find'
import { repositoryRemoveOrganization } from '../repositories/organizations/remove'
import { repositoryUpdateOrganization } from '../repositories/organizations/update'
import { CallbackPromise } from '../types/promise.type'
import {
  createOrganizationType,
  removeOrganizationType,
  updateOrganizationType,
} from '../validators/organization.validator'

export default class OrganizationsService {
  async create(
    createOrganization: createOrganizationType,
  ): Promise<CallbackPromise> {
    return await repositoryCreateOrganization(createOrganization)
  }

  async findAll(): Promise<CallbackPromise> {
    return await repositoryFindAllOrganizations()
  }

  async findByDocument(document: string): Promise<CallbackPromise> {
    return await repositoryFindByDocumentOrganization(document)
  }

  async findOne(id: string): Promise<CallbackPromise> {
    return await repositoryFindOneOrganization(id)
  }

  async update(
    id: string,
    updateOrganization: updateOrganizationType,
  ): Promise<CallbackPromise> {
    return await repositoryUpdateOrganization(id, updateOrganization)
  }

  async remove(
    id: string,
    removeOrganization: removeOrganizationType,
  ): Promise<CallbackPromise> {
    return await repositoryRemoveOrganization(id, removeOrganization)
  }
}
