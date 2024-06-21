import AddressesService from '@/services/addresses.service'
import {
  AddressUpdateValidator,
  AddressUpdateValidatorType,
} from '@/validators/addresses.validator'

const addressesService = new AddressesService()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await addressesService.findById(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs: AddressUpdateValidatorType = await request.json()
  try {
    if (await AddressUpdateValidator.parseAsync(inputs))
      return new Response(
        JSON.stringify(await addressesService.update(id, inputs)),
      )
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs = await request.json()
  try {
    return new Response(
      JSON.stringify(await addressesService.remove(id, inputs)),
    )
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
