import { BlogActions } from '@/app/blog/actions'
import {
  PostCreateValidator,
  PostCreateValidatorType,
} from '@/app/blog/validators'

const blogActions = new BlogActions()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await blogActions.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function POST(request: Request) {
  const inputs: PostCreateValidatorType = await request.json()
  try {
    if (await PostCreateValidator.parseAsync(inputs)) {
      return new Response(JSON.stringify(await blogActions.create(inputs)))
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
