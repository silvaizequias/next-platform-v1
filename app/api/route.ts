export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify({ method: request.method }))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
