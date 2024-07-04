import { OrganizationsService } from '@/app/core/services/organizations.service'

export async function GET(request: Request) {
  const organizations = new OrganizationsService().findAll()
  try {
    return new Response(JSON.stringify(await organizations))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
