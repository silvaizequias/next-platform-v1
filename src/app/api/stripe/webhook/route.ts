export const GET = async (request: Request) => {
  try {
    return new Response(JSON.stringify(request.method))
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
 // TODO: Estruturar webhook

export const POST = async (request: Request) => {
  try {
    return new Response(JSON.stringify(request.method))
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
