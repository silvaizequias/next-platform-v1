import { PostType } from '@/types/post'

interface Props {
  post: PostType
}

export default function PostDetailScreen(props: Props) {
  const { post } = props

  return (
    <div className="max-w-full py-10">
      <div className="flex flex-1 flex-col justify-center gap-4">
        <div className="w-full flex justify-center">
          <div className="px-8 sm:px-20 text-center">
            <span className="italic text-xs">{post?.resume}</span>
          </div>
        </div>
        <div className="mx-2 sm:mx-8">
          <div className="w-full p-4 bg-blue-gray-50 rounded-md shadow-md">
            <article
              className="prose-md prose prose-stone m-auto w-11/12 dark:prose-invert sm:prose-lg sm:w-3/4"
              dangerouslySetInnerHTML={{ __html: post?.content }}
            />
          </div>
          <div className="m-4 text-center text-xs lowercase text-blue-gray-400">
            esta publicação foi criada em{' '}
            <span className="font-semibold">
              {new Date(post?.createdAt).toLocaleDateString()}
            </span>{' '}
            por <span className="font-semibold">{post?.author}</span> usando
            inteligência artificial
          </div>
        </div>
      </div>
    </div>
  )
}
