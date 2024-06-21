import AddressesService from '@/services/addresses.service'

const addressesService = new AddressesService()

export async function GET(
  request: Request,
  { params }: { params: { zipCode: string } },
) {
  const { zipCode } = params
  try {
    return new Response(
      JSON.stringify(await addressesService.findByZipCode(zipCode)),
    )
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
