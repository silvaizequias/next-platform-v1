export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id

  try {
    return new Response(JSON.stringify(request.method))
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
