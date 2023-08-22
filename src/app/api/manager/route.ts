export const GET = async (request: Request) => {
  try {
    return new Response(JSON.stringify(request.method))
  } catch (error: any) {
    return new Response(JSON.stringify(error?.message || error), {
      status: 400,
    })
  }
}
