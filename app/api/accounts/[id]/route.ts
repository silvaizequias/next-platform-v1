import AccountsService from '@/services/accounts.service'
import {
  AccountUpdateValidator,
  AccountUpdateValidatorType,
} from '@/validators/accounts.validator'

const accountsService = new AccountsService()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await accountsService.findById(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs: AccountUpdateValidatorType = await request.json()
  try {
    if (await AccountUpdateValidator.parseAsync(inputs))
      return new Response(
        JSON.stringify(await accountsService.update(id, inputs)),
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
    return new Response(JSON.stringify(await accountsService.remove(id, false)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
