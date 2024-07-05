import { OrganizationsService } from '@/app/core/services/organizations.service'

const organizationsServices = new OrganizationsService()

export async function GET(
  request: Request,
  { params }: { params: { document: string } },
) {
  const { document } = params
  try {
    return new Response(
      JSON.stringify(await organizationsServices.findByDocument(document)),
    )
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
