import Accounts from '@/components/accounts'

const accounts = new Accounts()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await accounts.findById(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
