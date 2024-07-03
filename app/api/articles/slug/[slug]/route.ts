export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params
  try {
    return new Response(slug)
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
