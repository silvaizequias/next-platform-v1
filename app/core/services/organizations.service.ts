import { Organization } from '../interfaces/organization.interface'
import {
  createOrganizationType,
  removeOrganizationType,
  updateOrganizationType,
} from '../validators/organization.validator'

export class OrganizationsService {
  async create(createOrganization: createOrganizationType): Promise<any> {
    try {
      return createOrganization
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async findAll(): Promise<Organization[] | any> {
    try {
      return []
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async findByDocument(document: string): Promise<Organization | any> {
    try {
      return { document }
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async findOne(id: string): Promise<Organization | any> {
    try {
      return { id }
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async update(
    id: string,
    updateOrganization: updateOrganizationType,
  ): Promise<any> {
    try {
      return { id, updateOrganization }
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async remove(
    id: string,
    removeOrganization: removeOrganizationType,
  ): Promise<any> {
    try {
      return { id, removeOrganization }
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }
}
