import { actionGetPostByParams } from '../../[slug]/actions'
import { PostType } from '../../types'
import EditorPostUpdateScreen from './screen'

export default async function EditorPostUpdatePage({
  params,
}: {
  params: { slug: string }
}) {
  const post: PostType | any = await actionGetPostByParams(params?.slug)

  return <EditorPostUpdateScreen post={post} />
}
