import AddressesService from '@/services/addresses.service'
import {
  AddressCreateValidator,
  AddressCreateValidatorType,
} from '@/validators/addresses.validator'

const addressesService = new AddressesService()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await addressesService.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function POST(request: Request) {
  const inputs: AddressCreateValidatorType = await request.json()
  try {
    if (await AddressCreateValidator.parseAsync(inputs))
      return new Response(JSON.stringify(await addressesService.create(inputs)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
