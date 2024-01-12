import BlogHeader from '@/components/blog-header'
import BlogScreen from './screen'
import { PostType } from './types'
import { actionGetPosts } from './actions'

export default async function BlogPage() {
  const posts: PostType[] | any = await actionGetPosts()
  const image = '/logotipo.svg'

  return (
    <div className="flex flex-col">
      <BlogHeader
        title={'blog dedicado'}
        subject={'conteúdo inteligente do universo da tecnologia'}
        image={image}
      />
      <div className="flex flex-col justify-center">
        <div className="max-w-full py-10">
          <div className="mx-2 sm:mx-8">
            <BlogScreen posts={posts!} />
          </div>
        </div>
      </div>
    </div>
  )
}
