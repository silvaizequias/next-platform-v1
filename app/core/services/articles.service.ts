import { repositoryCreateArticle } from '../repositories/articles/create'
import {
  repositoryFindAllArticles,
  repositoryFindBySlugArticle,
  repositoryFindOneArticle,
} from '../repositories/articles/find'
import { repositoryRemoveArticle } from '../repositories/articles/remove'
import { repositoryUpdateArticle } from '../repositories/articles/update'
import { CallbackPromise } from '../types/promise.type'
import {
  createArticleType,
  removeArticleType,
  updateArticleType,
} from '../validators/article.validator'

export default class ArticlesService {
  async create(createArticle: createArticleType): Promise<CallbackPromise> {
    return await repositoryCreateArticle(createArticle)
  }

  async findAll(): Promise<CallbackPromise> {
    return await repositoryFindAllArticles()
  }

  async findBySlug(slug: string): Promise<CallbackPromise> {
    return await repositoryFindBySlugArticle(slug)
  }

  async findOne(id: string): Promise<CallbackPromise> {
    return await repositoryFindOneArticle(id)
  }

  async update(
    id: string,
    updateArticle: updateArticleType,
  ): Promise<CallbackPromise> {
    return await repositoryUpdateArticle(id, updateArticle)
  }

  async remove(
    id: string,
    removeArticle: removeArticleType,
  ): Promise<CallbackPromise> {
    return await repositoryRemoveArticle(id, removeArticle)
  }
}
