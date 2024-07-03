export async function GET(
  request: Request,
  { params }: { params: { document: string } },
) {
  const { document } = params
  try {
    return new Response(document)
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
