import MembersService from '@/app/core/services/members.service'
import {
  removeMember,
  removeMemberType,
  updateMember,
  updateMemberType,
} from '@/app/core/validators/member.validator'

const membersService = new MembersService()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await membersService.findOne(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs: updateMemberType = await request.json()
  try {
    if (await updateMember.parseAsync(inputs)) {
      return new Response(
        JSON.stringify(await membersService.update(id, inputs)),
      )
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs: removeMemberType = await request.json()
  try {
    if (await removeMember.parseAsync(inputs)) {
      return new Response(
        JSON.stringify(await membersService.remove(id, inputs)),
      )
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
