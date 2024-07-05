import { UsersService } from '@/app/core/services/users.service'
import {
  createUser,
  createUserType,
} from '@/app/core/validators/user.validator'

const usersService = new UsersService()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await usersService.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function POST(request: Request) {
  const inputs: createUserType = await request.json()
  try {
    if (await createUser.parseAsync(inputs)) {
      return new Response(JSON.stringify(await usersService.create(inputs)))
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
