import { UsersService } from '@/app/core/services/users.service'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const user = new UsersService().findOne(id)
  try {
    return new Response(JSON.stringify(await user))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
