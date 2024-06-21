import OrganizationsService from '@/services/organizations.service'
import {
  OrganizationUpdateValidator,
  OrganizationUpdateValidatorType,
} from '@/validators/organizations.validator'

const organizationsService = new OrganizationsService()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await organizationsService.findById(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs: OrganizationUpdateValidatorType = await request.json()
  try {
    if (await OrganizationUpdateValidator.parseAsync(inputs))
      return new Response(
        JSON.stringify(await organizationsService.update(id, inputs)),
      )
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs = await request.json()
  try {
    return new Response(
      JSON.stringify(await organizationsService.remove(id, false)),
    )
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
