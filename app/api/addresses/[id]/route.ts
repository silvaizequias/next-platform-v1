import AddressActions from '@/components/addresses/actions'

const addressActions = new AddressActions()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await addressActions.findById(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
