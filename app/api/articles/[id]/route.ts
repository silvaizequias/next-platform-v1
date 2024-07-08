import ArticlesService from '@/app/core/services/articles.service'
import {
  removeArticle,
  removeArticleType,
  updateArticle,
  updateArticleType,
} from '@/app/core/validators/article.validator'

const articlesService = new ArticlesService()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await articlesService.findOne(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs: updateArticleType = await request.json()
  try {
    if (await updateArticle.parseAsync(inputs)) {
      return new Response(
        JSON.stringify(await articlesService.update(id, inputs)),
      )
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs: removeArticleType = await request.json()
  try {
    if (await removeArticle.parseAsync(inputs)) {
      return new Response(
        JSON.stringify(await articlesService.remove(id, inputs)),
      )
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
