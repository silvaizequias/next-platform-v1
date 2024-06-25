import Members from '@/actions/members'

const members = new Members()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await members.findById(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
