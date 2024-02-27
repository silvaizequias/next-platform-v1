import { RegisterSchema, RegisterSchemaType } from '@/schemas/register'

export const register = async (inputs: RegisterSchemaType): Promise<any> => {
  try {
    if (await RegisterSchema.parseAsync(inputs)) {
      const data = await fetch(`${process.env.MANAGEMENT_API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return data && (await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
