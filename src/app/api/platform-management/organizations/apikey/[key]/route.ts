export async function GET(
  request: Request,
  { params }: { params: { key: string } },
) {
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const { key } = params
  try {
    const data = await fetch(
      `${PLATFORM_API_URL}/organizations/apikey/${key}`,
      {
        method: 'GET',
      },
    )
    return new Response(JSON.stringify(await data.json()), {
      status: data.status,
    })
  } catch (error: any) {
    return new Response(error.message || error, { status: 400 })
  }
}
