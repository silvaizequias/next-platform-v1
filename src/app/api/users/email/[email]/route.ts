import { getUserByEmail } from '@/repositories/users/GET'

export async function GET(
  request: Request,
  { params }: { params: { email: string } },
) {
  const { email } = params
  try {
    return new Response(JSON.stringify(await getUserByEmail(email)), {
      status: 200,
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}
