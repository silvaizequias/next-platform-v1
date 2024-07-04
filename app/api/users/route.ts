import { UsersService } from '@/app/core/services/users.service'

export async function GET(request: Request) {
  const users = new UsersService().findAll()
  try {
    return new Response(JSON.stringify(await users))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
