export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(id)
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
