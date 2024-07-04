import { MembersService } from '@/app/core/services/members.service'

export async function GET(request: Request) {
  const members = new MembersService().findAll()
  try {
    return new Response(JSON.stringify(await members))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
