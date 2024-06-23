import Accounts from '@/components/accounts'

const accounts = new Accounts()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await accounts.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
