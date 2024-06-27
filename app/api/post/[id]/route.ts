import { PostActions } from '@/app/controle/posts/actions'
import {
  PostRemoveValidator,
  PostRemoveValidatorType,
  PostUpdateValidator,
  PostUpdateValidatorType,
} from '@/app/controle/posts/validators'

const postActions = new PostActions()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    return new Response(JSON.stringify(await postActions.findOne(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    const inputs: PostUpdateValidatorType = await request.json()
    if (await PostUpdateValidator.parseAsync(inputs)) {
      return new Response(JSON.stringify(await postActions.update(id, inputs)))
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    const inputs: PostRemoveValidatorType = await request.json()
    if (await PostRemoveValidator.parseAsync(inputs)) {
      return new Response(JSON.stringify(await postActions.remove(id, inputs)))
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
