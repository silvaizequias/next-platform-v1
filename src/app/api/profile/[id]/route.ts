import { ProfileUpdateSchema, ProfileUpdateSchemaType } from '@/schemas/profile'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id

  try {
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id

  try {
    return request.json().then(async (inputs: ProfileUpdateSchemaType) => {
      if (ProfileUpdateSchema.validateSync(inputs)) {
        return new Response(JSON.stringify(inputs))
      }
    })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
