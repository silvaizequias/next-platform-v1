import MemberActions from '@/components/members/actions'

const memberActions = new MemberActions()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await memberActions.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
