import AccountActions from '@/components/accounts/actions'

const accountActions = new AccountActions()

export async function GET(
  request: Request,
  { params }: { params: { phone: string } },
) {
  const { phone } = params
  try {
    return new Response(JSON.stringify(await accountActions.findByPhone(phone)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
