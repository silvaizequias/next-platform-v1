import { AuthSignInSchema, AuthSignInSchemaType } from '@/schemas/auth'

export const POST = async (request: Request) => {
  try {
    return request.json().then(async (inputs: AuthSignInSchemaType) => {
      if (AuthSignInSchema.validateSync(inputs)) {
        return new Response(JSON.stringify(inputs))
      }
    })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
