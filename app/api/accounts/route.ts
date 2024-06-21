import AccountsService from '@/services/accounts.service'
import {
  AccountCreateValidator,
  AccountCreateValidatorType,
} from '@/validators/accounts.validator'

const accountsService = new AccountsService()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await accountsService.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function POST(request: Request) {
  const inputs: AccountCreateValidatorType = await request.json()
  try {
    if (await AccountCreateValidator.parseAsync(inputs))
      return new Response(JSON.stringify(await accountsService.create(inputs)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
