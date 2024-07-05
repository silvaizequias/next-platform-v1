import { OrganizationsService } from '@/app/core/services/organizations.service'
import {
  createOrganization,
  createOrganizationType,
} from '@/app/core/validators/organization.validator'

const organizationsServices = new OrganizationsService()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await organizationsServices.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function POST(request: Request) {
  const inputs: createOrganizationType = await request.json()
  try {
    if (await createOrganization.parseAsync(inputs)) {
      return new Response(
        JSON.stringify(await organizationsServices.create(inputs)),
      )
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
