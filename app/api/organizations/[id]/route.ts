import { OrganizationsService } from '@/app/core/services/organizations.service'
import {
  removeOrganization,
  removeOrganizationType,
  updateOrganization,
  updateOrganizationType,
} from '@/app/core/validators/organization.validator'

const organizationsServices = new OrganizationsService()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await organizationsServices.findOne(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs: updateOrganizationType = await request.json()
  try {
    if (await updateOrganization.parseAsync(inputs)) {
      return new Response(
        JSON.stringify(await organizationsServices.update(id, inputs)),
      )
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs: removeOrganizationType = await request.json()
  try {
    if (await removeOrganization.parseAsync(inputs)) {
      return new Response(
        JSON.stringify(await organizationsServices.update(id, inputs)),
      )
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
