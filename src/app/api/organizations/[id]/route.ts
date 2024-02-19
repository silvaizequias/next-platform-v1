import { softDeleteOrganization } from '@/repositories/organizations/DELETE'
import { getOrganizationById } from '@/repositories/organizations/GET'
import { updateOrganization } from '@/repositories/organizations/PATCH'
import { UpdateOrganizationSchemaType } from '@/schemas/organization.schema'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await getOrganizationById(id)), {
      status: 200,
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs: UpdateOrganizationSchemaType = await request.json()
  try {
    return new Response(JSON.stringify(await updateOrganization(id, inputs)), {
      status: 201,
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await softDeleteOrganization(id)), {
      status: 201,
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}
