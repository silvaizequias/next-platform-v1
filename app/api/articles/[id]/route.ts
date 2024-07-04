import { ArticlesService } from '@/app/core/services/articles.service'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const article = new ArticlesService().findOne(id)
  try {
    return new Response(JSON.stringify(await article))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
