export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(request.method))
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
