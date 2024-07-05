import { ArticlesService } from '@/app/core/services/articles.service'

const articlesService = new ArticlesService()

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params
  try {
    return new Response(JSON.stringify(await articlesService.findBySlug(slug)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
