export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(request.method), { status: 200 })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
