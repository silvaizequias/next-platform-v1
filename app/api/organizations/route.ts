import OrganizationsService from '@/services/organizations.service'
import {
  OrganizationCreateValidator,
  OrganizationCreateValidatorType,
} from '@/validators/organizations.validator'

const organizationsService = new OrganizationsService()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await organizationsService.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function POST(request: Request) {
  const inputs: OrganizationCreateValidatorType = await request.json()
  try {
    if (await OrganizationCreateValidator.parseAsync(inputs))
      return new Response(
        JSON.stringify(await organizationsService.create(inputs)),
      )
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
