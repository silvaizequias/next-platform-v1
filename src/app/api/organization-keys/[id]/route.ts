import { softDeleteOrganizationKey } from '@/repositories/organization-keys/DELETE'
import { getOrganizationKeyById } from '@/repositories/organization-keys/GET'
import { updateOrganizationKey } from '@/repositories/organization-keys/PATCH'
import { UpdateOrganizationKeySchemaType } from '@/schemas/organization-key.schema'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await getOrganizationKeyById(id)), {
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
  const inputs: UpdateOrganizationKeySchemaType = await request.json()
  try {
    return new Response(
      JSON.stringify(await updateOrganizationKey(id, inputs)),
      {
        status: 201,
      },
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
    return new Response(JSON.stringify(await softDeleteOrganizationKey(id)), {
      status: 201,
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}
