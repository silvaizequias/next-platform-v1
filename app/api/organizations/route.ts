export async function GET(request: Request) {
  try {
    return new Response(request.method)
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
