import { ArticlesService } from '@/app/core/services/articles.service'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params
  const article = new ArticlesService().findBySlug(slug)
  try {
    return new Response(JSON.stringify(await article))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
