import Organizations from '@/components/organizations'

const organizations = new Organizations()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await organizations.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
