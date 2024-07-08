import UsersService from '@/app/core/services/users.service'
import {
  removeUser,
  removeUserType,
  updateUser,
  updateUserType,
} from '@/app/core/validators/user.validator'

const usersService = new UsersService()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await usersService.findOne(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs: updateUserType = await request.json()
  try {
    if (await updateUser.parseAsync(inputs)) {
      return new Response(JSON.stringify(await usersService.update(id, inputs)))
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
  const inputs: removeUserType = await request.json()
  try {
    if (await removeUser.parseAsync(inputs)) {
      return new Response(JSON.stringify(await usersService.remove(id, inputs)))
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
