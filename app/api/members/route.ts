import Members from '@/app/actions/members'

const members = new Members()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await members.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
