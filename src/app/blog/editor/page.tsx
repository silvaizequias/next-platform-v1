import { Fragment } from 'react'
import { actionGetPosts } from '../actions'
import { PostType } from '../types'
import EditorScreen from './screen'

export default async function EditorPage() {
  const posts: PostType | any = await actionGetPosts()

  return (
    <Fragment>
      <div className="max-w-full py-10">
        <div className="flex flex-1 flex-col justify-center gap-4 ">
          <EditorScreen posts={posts} />
        </div>
      </div>
    </Fragment>
  )
}
