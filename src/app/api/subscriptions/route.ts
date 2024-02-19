export async function GET(request: Request) {}

export async function POST(request: Request) {
  const inputs = await request.json()
  try {
    return new Response(JSON.stringify(''))
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}
