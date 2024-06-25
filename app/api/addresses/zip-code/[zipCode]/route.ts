import Addresses from '@/actions/addresses'

const addresses = new Addresses()

export async function GET(
  request: Request,
  { params }: { params: { zipCode: string } },
) {
  const { zipCode } = params
  try {
    return new Response(JSON.stringify(await addresses.findByZipCode(zipCode)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
