import { softDeleteUser } from '@/repositories/users/DELETE'
import { getUserById } from '@/repositories/users/GET'
import { updateUser } from '@/repositories/users/PATCH'
import { UpdateUserSchemaType } from '@/schemas/user.schema'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await getUserById(id)), { status: 200 })
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
  const inputs: UpdateUserSchemaType = await request.json()
  try {
    return new Response(await updateUser(id, inputs))
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
    return new Response(JSON.stringify(await softDeleteUser(id)), {
      status: 201,
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}
