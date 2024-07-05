import { Organization } from '../types/organization.type'
import { CallbackPromise } from '../types/promise.type'
import {
  createOrganizationType,
  removeOrganizationType,
  updateOrganizationType,
} from '../validators/organization.validator'

export class OrganizationsService {
  async create(
    createOrganization: createOrganizationType,
  ): Promise<CallbackPromise> {
    try {
      return { success: true, response: createOrganization }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
    }
  }

  async findAll(): Promise<CallbackPromise> {
    try {
      const organizations: Organization[] = []
      return { success: true, response: organizations }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
    }
  }

  async findByDocument(document: string): Promise<CallbackPromise> {
    try {
      return { success: true, response: document }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
    }
  }

  async findOne(id: string): Promise<CallbackPromise> {
    try {
      return { success: true, response: id }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
    }
  }

  async update(
    id: string,
    updateOrganization: updateOrganizationType,
  ): Promise<CallbackPromise> {
    try {
      return { success: true, response: { id, updateOrganization } }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
    }
  }

  async remove(
    id: string,
    removeOrganization: removeOrganizationType,
  ): Promise<CallbackPromise> {
    try {
      return { success: true, response: { id, removeOrganization } }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
    }
  }
}
