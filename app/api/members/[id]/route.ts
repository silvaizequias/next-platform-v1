import { MembersService } from '@/app/core/services/members.service'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const member = new MembersService().findOne(id)
  try {
    return new Response(JSON.stringify(await member))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
