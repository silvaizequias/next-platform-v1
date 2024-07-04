import { OrganizationsService } from '@/app/core/services/organizations.service'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const organization = new OrganizationsService().findOne(id)
  try {
    return new Response(JSON.stringify(await organization))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
