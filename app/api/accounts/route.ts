import AccountActions from '@/components/accounts/actions'

const accountActions = new AccountActions()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await accountActions.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
