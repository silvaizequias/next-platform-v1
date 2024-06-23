import { removeOrganization } from '@/repositories/organizations/DELETE'
import {
  findAllOrganizations,
  findOrganizationByDocument,
  findOrganizationById,
} from '@/repositories/organizations/GET'
import { updateOrganization } from '@/repositories/organizations/PATCH'
import { createOrganization } from '@/repositories/organizations/POST'
import {
  OrganizationCreateValidator,
  OrganizationCreateValidatorType,
  OrganizationUpdateValidator,
  OrganizationUpdateValidatorType,
} from '@/validators/organizations.validator'

export type Organization = {
  id: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  softDeleted?: boolean
  active?: boolean
  name: string
  image?: string
  email?: string
  phone?: string
  document: string
}

export default class OrganizationsService {
  create(data: OrganizationCreateValidatorType): Promise<any> {
    return createOrganization(data)
  }

  async createFormAction(_: unknown, form: FormData) {
    const inputs = Object.fromEntries(form)

    const validator = OrganizationCreateValidator.safeParse(inputs)
    if (!validator.success)
      return { error: validator.error.flatten().fieldErrors }

    console.log(inputs)
    return {}
  }

  findAll(): Promise<Organization[] | any> {
    return findAllOrganizations()
  }

  findById(id: string): Promise<Organization | any> {
    return findOrganizationById(id)
  }

  findByDocument(document: string): Promise<Organization | any> {
    return findOrganizationByDocument(document)
  }

  update(id: string, data: OrganizationUpdateValidatorType): Promise<any> {
    return updateOrganization(id, data)
  }

  async updateFormAction(_: unknown, form: FormData) {
    const inputs = Object.fromEntries(form)

    const validator = OrganizationUpdateValidator.safeParse(inputs)
    if (!validator.success)
      return { error: validator.error.flatten().fieldErrors }

    console.log(inputs)
    return {}
  }

  remove(id: string, definitely: boolean): Promise<any> {
    return removeOrganization(id, definitely)
  }
}
