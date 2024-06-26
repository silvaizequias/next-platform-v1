import { BlogActions } from "@/app/blog/actions"

const blogActions = new BlogActions()

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params
    return new Response(JSON.stringify(await blogActions.findBySlug(slug)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}