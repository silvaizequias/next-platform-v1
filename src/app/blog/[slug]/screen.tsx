import PostToolbar from '@/components/post-toolbar'
import { PublicationType } from '../types'

interface Props {
  publication: PublicationType
}

export default function PublicationDetailScreen(props: Props) {
  const { publication } = props

  const content = { __html: publication?.content }

  return publication ? (
    <div className="max-w-full py-10 bg-gradient-to-b from-blue-gray-50 to-blue-gray-100">
      <div className="flex flex-1 flex-col justify-center gap-4 ">
        <div className="w-full flex justify-center">
          <div className="px-8 sm:px-20 max-w-4xl text-center">
            <span className="italic text-xs">{publication?.resume}</span>
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
            {new Date(publication?.createdAt).toLocaleDateString()}
          </span>{' '}
          por <span className="font-semibold">{publication?.author}</span>{' '}
          {publication?.generatedByAi && (
            <span>usando inteligência artificial</span>
          )}
        </div>
      </div>
    </div>
  ) : null
}
