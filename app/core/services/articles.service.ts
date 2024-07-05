import { Article } from '../interfaces/article.interface'
import { CallbackPromise } from '../interfaces/promise.interface'
import {
  createArticleType,
  removeArticleType,
  updateArticleType,
} from '../validators/article.validator'

export class ArticlesService {
  async create(createArticle: createArticleType): Promise<CallbackPromise> {
    try {
      return createArticle
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
    }
  }

  async findAll(): Promise<CallbackPromise> {
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
    }
  }

  async findBySlug(slug: string): Promise<CallbackPromise> {
    try {
      return { success: true, response: slug }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
    }
  }

  async findOne(id: string): Promise<CallbackPromise> {
    try {
      return { success: true, response: id }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
    }
  }

  async update(
    id: string,
    updateArticle: updateArticleType,
  ): Promise<CallbackPromise> {
    try {
      return { success: true, response: { id, updateArticle } }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
    }
  }

  async remove(
    id: string,
    removeArticle: removeArticleType,
  ): Promise<CallbackPromise> {
    try {
      return { success: true, response: { id, removeArticle } }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
    }
  }
}
