import PostToolbar from '@/components/post-toolbar'
import { PostType } from '../types'

interface Props {
  post: PostType
}

export default function PostDetailScreen(props: Props) {
  const { post } = props

  const content = { __html: post?.content }

  return post ? (
    <div className="max-w-full py-10 bg-gradient-to-b from-blue-gray-50 to-blue-gray-100">
      <div className="flex flex-1 flex-col justify-center gap-4 ">
        <div className="w-full flex justify-center">
          <div className="px-8 sm:px-20 max-w-4xl text-center">
            <span className="italic text-xs">{post?.resume}</span>
          </div>
        </div>
        <PostToolbar />
        <div className="w-full flex justify-center">
          <div className="p-6 mx-2 sm:mx-8 bg-blue-gray-50 rounded-md shadow-md">
            <article
              className="prose-md prose prose-stone m-auto dark:prose-invert sm:prose-lg text-justify"
              dangerouslySetInnerHTML={content}
            />
          </div>
        </div>
        <div className="m-4 text-center text-xs lowercase text-blue-gray-400">
          esta publicação foi criada em{' '}
          <span className="font-semibold">
            {new Date(post?.createdAt).toLocaleDateString()}
          </span>{' '}
          por <span className="font-semibold">{post?.author}</span>{' '}
          {post?.generatedByAi && <span>usando inteligência artificial</span>}
        </div>
      </div>
    </div>
  ) : null
}
