import MembersService from '@/services/members.service'

const membersService = new MembersService()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await membersService.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
