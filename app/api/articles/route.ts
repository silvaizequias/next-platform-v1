import { ArticlesService } from '@/app/core/services/articles.service'

export async function GET(request: Request) {
  const articles = new ArticlesService().findAll()
  try {
    return new Response(JSON.stringify(await articles))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
