'use server'

import { getOrganizationByDocument } from '@/repositories/organizations/GET'
import { updateOrganization } from '@/repositories/organizations/PATCH'
import { createOrganizationForUser } from '@/repositories/organizations/POST'
import {
  CreateOrganizationSchemaType,
  UpdateOrganizationSchemaType,
} from '@/schemas/organization'
import { OrganizationType } from '@/types/organization'
import { revalidatePath } from 'next/cache'

export const actionCreateOrganizationForUser = async (
  inputs: CreateOrganizationSchemaType,
  phone: string,
): Promise<any> => {
  const data = await createOrganizationForUser(inputs, phone)
  revalidatePath('/')
  return data
}

export const actionGetOrganizationByDocument = async (
  document: string,
): Promise<OrganizationType | any> => {
  return await getOrganizationByDocument(document)
}

export const actionUpdateOrganization = async (
  id: string,
  inputs: UpdateOrganizationSchemaType,
): Promise<any> => {
  const data = await updateOrganization(id, inputs)
  revalidatePath(`/`)
  return data
}
