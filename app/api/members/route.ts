import MembersService from '@/services/members.service'
import {
  MemberCreateValidator,
  MemberCreateValidatorType,
} from '@/validators/members.validator'

const membersService = new MembersService()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await membersService.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function POST(request: Request) {
  const inputs: MemberCreateValidatorType = await request.json()
  try {
    if (await MemberCreateValidator.parseAsync(inputs))
      return new Response(JSON.stringify(await membersService.create(inputs)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
