import AddressActions from '@/components/addresses/actions'

const addressActions = new AddressActions()

export async function GET(
  request: Request,
  { params }: { params: { zipCode: string } },
) {
  const { zipCode } = params
  try {
    return new Response(
      JSON.stringify(await addressActions.findByZipCode(zipCode)),
    )
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
