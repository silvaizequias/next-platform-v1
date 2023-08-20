import { AuthSignUpSchema, AuthSignUpSchemaType } from '@/schemas/auth'

export const POST = async (request: Request) => {
  try {
    return request.json().then(async (inputs: AuthSignUpSchemaType) => {
      if (AuthSignUpSchema.validateSync(inputs)) {
        return new Response(JSON.stringify(inputs))
      }
    })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
