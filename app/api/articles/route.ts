import ArticlesService from '@/app/core/services/articles.service'
import {
  createArticle,
  createArticleType,
} from '@/app/core/validators/article.validator'

const articlesService = new ArticlesService()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await articlesService.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function POST(request: Request) {
  const inputs: createArticleType = await request.json()
  try {
    if (await createArticle.parseAsync(inputs)) {
      return new Response(JSON.stringify(await articlesService.create(inputs)))
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
