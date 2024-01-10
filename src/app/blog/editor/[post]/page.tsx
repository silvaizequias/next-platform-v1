import { actionGetPostByParams } from '../../[post]/actions'
import { PostType } from '../../types'
import UpdateEditorScreen from './screen'

export default async function UpdateEditorPage({
  params,
}: {
  params: { post: string }
}) {
  const post: PostType = await actionGetPostByParams(params?.post)

  return <UpdateEditorScreen post={post} />
}
