export async function GET(request: Request) {
  return new Response(JSON.stringify(request.method), { status: 200 })
}
