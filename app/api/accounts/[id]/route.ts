import AccountActions from '@/components/accounts/actions'

const accountsActions = new AccountActions()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await accountsActions.findById(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
