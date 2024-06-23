import Accounts from '@/components/accounts'

const accounts = new Accounts()

export async function GET(
  request: Request,
  { params }: { params: { phone: string } },
) {
  const { phone } = params
  try {
    return new Response(JSON.stringify(await accounts.findByPhone(phone)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
