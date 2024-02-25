import { createApiSpend } from '@/repositories/api-spends/POST'
import { CreateApiSpendSchemaType } from '@/schemas/api-spend'

export async function POST(request: Request) {
  try {
    const inputs: CreateApiSpendSchemaType = await request.json()
    return new Response(JSON.stringify(await createApiSpend(inputs)), {
      status: 201,
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status | 400,
    })
  }
}
