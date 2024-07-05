import { MembersService } from '@/app/core/services/members.service'
import {
  createMember,
  createMemberType,
} from '@/app/core/validators/member.validator'

const membersService = new MembersService()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await membersService.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function POST(request: Request) {
  const inputs: createMemberType = await request.json()
  try {
    if (await createMember.parseAsync(inputs)) {
      return new Response(JSON.stringify(await membersService.create(inputs)))
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
