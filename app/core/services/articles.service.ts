import { Article } from '../interfaces/article.interface'
import {
  createArticleType,
  removeArticleType,
  updateArticleType,
} from '../validators/article.validator'

export class ArticlesService {
  async create(createArticle: createArticleType): Promise<any> {
    try {
      return createArticle
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async findAll(): Promise<Article[] | any> {
    try {
      return []
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async findBySlug(slug: string): Promise<Article | any> {
    try {
      return { slug }
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async findOne(id: string): Promise<Article | any> {
    try {
      return { id }
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async update(id: string, updateArticle: updateArticleType): Promise<any> {
    try {
      return { id, updateArticle }
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async remove(id: string, removeArticle: removeArticleType): Promise<any> {
    try {
      return { id, removeArticle }
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }
}
