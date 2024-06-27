import { PostActions } from '@/app/controle/posts/actions'
import {
  PostCreateValidator,
  PostCreateValidatorType,
} from '@/app/controle/posts/validators'

const postActions = new PostActions()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await postActions.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function POST(request: Request) {
  const inputs: PostCreateValidatorType = await request.json()
  try {
    if (await PostCreateValidator.parseAsync(inputs)) {
      return new Response(JSON.stringify(await postActions.create(inputs)))
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
