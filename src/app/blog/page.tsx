import BlogHeader from '@/components/blog-header'
import BlogScreen from './screen'

export default async function BlogPage() {
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
            <BlogScreen />
          </div>
        </div>
      </div>
    </div>
  )
}
