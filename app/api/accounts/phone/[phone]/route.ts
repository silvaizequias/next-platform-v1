import AccountsService from '@/services/accounts.service'

const accountsService = new AccountsService()

export async function GET(
  request: Request,
  { params }: { params: { phone: string } },
) {
  const { phone } = params
  try {
    return new Response(
      JSON.stringify(await accountsService.findByPhone(phone)),
    )
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
