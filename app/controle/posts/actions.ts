import { PostType } from './types';
import {
  PostCreateValidatorType,
  PostRemoveValidatorType,
  PostUpdateValidatorType,
} from './validators'

export class PostActions {
  async create(inputs: PostCreateValidatorType): Promise<any> {
    try {
      return inputs
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    } finally {
    }
  }

  async findAll(): Promise<PostType[] | any> {
    try {
      const data: [] | any = []
      return data
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    } finally {
    }
  }

  async findOne(id: string): Promise<PostType | any> {
    try {
      return id
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    } finally {
    }
  }

  async findBySlug(slug: string): Promise<PostType | any> {
    try {
      return slug
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    } finally {
    }
  }

  async update(id: string, inputs: PostUpdateValidatorType): Promise<any> {
    try {
      return { id, inputs }
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    } finally {
    }
  }

  async remove(id: string, inputs: PostRemoveValidatorType): Promise<any> {
    try {
      return { id, inputs }
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    } finally {
    }
  }
}
