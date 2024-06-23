import AccountsService from '@/services/accounts.service'

const accountsService = new AccountsService()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await accountsService.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
