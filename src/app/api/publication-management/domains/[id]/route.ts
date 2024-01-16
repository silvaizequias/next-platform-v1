export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    const PUBLICATION_API_URL = process.env.PUBLICATION_API_URL!
    const PUBLICATION_AUTHORIZATION_KEY =
      process.env.PUBLICATION_AUTHORIZATION_KEY!

    const data = await fetch(`${PUBLICATION_API_URL}/domains/${id}`, {
      method: 'GET',
      headers: {
        authorization: PUBLICATION_AUTHORIZATION_KEY,
      },
    })
    const result = data && await data.json()

    return new Response(JSON.stringify(result), { status: data.status })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}
