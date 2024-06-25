import Addresses from '@/actions/addresses'

const addresses = new Addresses()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await addresses.findById(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
