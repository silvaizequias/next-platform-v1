export const GET = async (request: Request) => {
  try {
    return new Response(JSON.stringify(request.method + ' OpenAI'))
  } catch (error: any) {
    console.error(error)
    return new Response(error?.message || error, { status: 400 })
  }
}
