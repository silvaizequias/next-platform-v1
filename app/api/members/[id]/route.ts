import MembersService from '@/services/members.service'

const membersService = new MembersService()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await membersService.findById(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
