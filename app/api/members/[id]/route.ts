import MemberActions from '@/components/members/actions'

const memberActions = new MemberActions()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await memberActions.findById(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
