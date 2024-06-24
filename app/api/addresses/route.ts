import Addresses from '@/app/actions/addresses'

const addresses = new Addresses()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await addresses.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
