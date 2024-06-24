import Organizations from '@/app/actions/organizations'

const organizations = new Organizations()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await organizations.findById(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
