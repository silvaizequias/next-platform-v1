import MembersService from '@/services/members.service'
import {
  MemberUpdateValidator,
  MemberUpdateValidatorType,
} from '@/validators/members.validator'

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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs: MemberUpdateValidatorType = await request.json()
  try {
    if (await MemberUpdateValidator.parseAsync(inputs))
      return new Response(
        JSON.stringify(await membersService.update(id, inputs)),
      )
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs = await request.json()
  try {
    return new Response(JSON.stringify(await membersService.remove(id, false)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
