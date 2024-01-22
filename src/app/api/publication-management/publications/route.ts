import { CreatePublicationDTO, CreatePublicationDTOType } from './dto'
export async function GET(request: Request) {
  try {
    const PUBLICATION_API_URL = process.env.PUBLICATION_API_URL!
    const PUBLICATION_AUTHORIZATION_KEY =
      process.env.PUBLICATION_AUTHORIZATION_KEY!

    const data = await fetch(`${PUBLICATION_API_URL}/publications`, {
      method: 'GET',
      headers: {
        authorization: PUBLICATION_AUTHORIZATION_KEY,
      },
    })
    const result = data && (await data.json())

    return new Response(JSON.stringify(result), { status: data.status })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}

export async function POST(request: Request) {
  try {
    const PUBLICATION_API_URL = process.env.PUBLICATION_API_URL!
    const PUBLICATION_AUTHORIZATION_KEY =
      process.env.PUBLICATION_AUTHORIZATION_KEY!

    const inputs: CreatePublicationDTOType = await request.json()
    if (await CreatePublicationDTO.parseAsync(inputs)) {
      const data = await fetch(`${PUBLICATION_API_URL}/publications`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: PUBLICATION_AUTHORIZATION_KEY,
        },
      })
      const result = data && (await data.json())

      return new Response(JSON.stringify(result), { status: data.status })
    }
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}
