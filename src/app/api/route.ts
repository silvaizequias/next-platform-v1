export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(request.method))
  } catch (error: any) {
    console.error(error)
    return new Response(JSON.stringify(error?.message || error), { status: 400 })
  }
}

export async function POST(request: Request) {
  try {
    return request.json().then(async (inputs) => {
      if (inputs) {
        return new Response(JSON.stringify(inputs))
      }
    })
  } catch (error: any) {
    console.error(error)
    return new Response(JSON.stringify(error?.message || error), { status: 400 })
  }
}
