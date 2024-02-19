import { getUsers } from '@/actions/users/GET'
import { postUser } from '@/actions/users/POST'
import { CreateUserSchemaType } from '@/schemas/user.schema'

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await getUsers()), { status: 200 })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}

export async function POST(request: Request) {
  const inputs: CreateUserSchemaType = await request.json()
  try {
    return new Response(JSON.stringify(await postUser(inputs)), { status: 201 })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}
