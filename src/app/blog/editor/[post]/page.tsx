import { actionGetPostByParams } from '../../[post]/actions'
import { PostType } from '../../types'
import EditorPostUpdateScreen from './screen'

export default async function EditorPostUpdatePage({
  params,
}: {
  params: { post: string }
}) {
  const post: PostType = await actionGetPostByParams(params?.post)

  return <EditorPostUpdateScreen post={post} />
}
