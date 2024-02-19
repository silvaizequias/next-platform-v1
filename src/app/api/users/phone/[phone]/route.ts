import { getUserByPhone } from '@/actions/users/GET'

export async function GET(
  request: Request,
  { params }: { params: { phone: string } },
) {
  const { phone } = params
  try {
    return new Response(JSON.stringify(await getUserByPhone(phone)), {
      status: 200,
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}
