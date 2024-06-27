import { PostActions } from "@/app/controle/posts/actions"

const postActions = new PostActions()

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params
    return new Response(JSON.stringify(await postActions.findBySlug(slug)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}