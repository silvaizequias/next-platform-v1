import { PrismaService } from '../../services/prisma.service'
import { Article } from '../../types/article.type'
import { CallbackPromise } from '../../types/promise.type'

const prismaService = new PrismaService()

export async function repositoryFindAllArticles(): Promise<CallbackPromise> {
  try {
    const articles: Article[] = []
    return { success: true, response: articles }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message,
      status: error?.status,
    }
  } finally {
    await prismaService.$disconnect()
  }
}

export async function repositoryFindBySlugArticle(
  slug: string,
): Promise<CallbackPromise> {
  try {
    return { success: true, response: slug }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message,
      status: error?.status,
    }
  } finally {
    await prismaService.$disconnect()
  }
}

export async function repositoryFindOneArticle(
  id: string,
): Promise<CallbackPromise> {
  try {
    return { success: true, response: id }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message,
      status: error?.status,
    }
  } finally {
    await prismaService.$disconnect()
  }
}
