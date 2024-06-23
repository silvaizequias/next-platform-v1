import Organizations from '@/components/organizations'

const organizations = new Organizations()

export async function GET(
  request: Request,
  { params }: { params: { document: string } },
) {
  const { document } = params
  try {
    return new Response(
      JSON.stringify(await organizations.findByDocument(document)),
    )
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
