import { BlogActions } from '@/app/blog/actions'
import {
  PostRemoveValidator,
  PostRemoveValidatorType,
  PostUpdateValidator,
  PostUpdateValidatorType,
} from '@/app/blog/validators'

const blogActions = new BlogActions()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    return new Response(JSON.stringify(await blogActions.findOne(id)))
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
      return new Response(JSON.stringify(await blogActions.update(id, inputs)))
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
      return new Response(JSON.stringify(await blogActions.remove(id, inputs)))
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
