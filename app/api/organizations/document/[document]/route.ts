import { OrganizationsService } from '@/app/core/services/organizations.service'

export async function GET(
  request: Request,
  { params }: { params: { document: string } },
) {
  const { document } = params
  const organization = new OrganizationsService().findByDocument(document)
  try {
    return new Response(JSON.stringify(await organization))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
