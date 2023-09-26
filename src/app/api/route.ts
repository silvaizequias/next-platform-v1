export const GET = async (request: Request) => {
  try {
    return new Response(JSON.stringify(request.method))
  } catch (error: any) {
    return new Response(error?.message! || error!, { status: 400 })
  }
}

export const POST = async (request: Request): Promise<any> => {
  const inputs = await request.json()
  try {
    if (inputs) {
      return new Response(JSON.stringify(inputs), { status: 201 })
    }
  } catch (error: any) {
    return new Response(error?.message! || error!, { status: 400 })
  }
}
