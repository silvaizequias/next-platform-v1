import { softDeleteOrganizationUser } from '@/repositories/organization-users/DELETE'
import { getOrganizationUserById } from '@/repositories/organization-users/GET'
import { updateOrganizationUser } from '@/repositories/organization-users/PATCH'
import { UpdateOrganizationUserSchemaType } from '@/schemas/organization-user.schema'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await getOrganizationUserById(id)), {
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
  const inputs: UpdateOrganizationUserSchemaType = await request.json()
  try {
    return new Response(
      JSON.stringify(await updateOrganizationUser(id, inputs)),
      { status: 201 },
    )
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
    return new Response(JSON.stringify(await softDeleteOrganizationUser(id)), {
      status: 201,
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}
