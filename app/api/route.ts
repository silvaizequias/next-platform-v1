export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(request), { status: 200 })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status | 400,
    })
  }
}
