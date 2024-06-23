import AddressActions from '@/components/addresses/actions'

const addressActions = new AddressActions()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await addressActions.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
