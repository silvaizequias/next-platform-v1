import BlogScreen from './screen'

export default async function BlogPage() {
  return (
    <div className="flex flex-col">
      <div className="w-full bg-gradient-to-r from-white to-blue-gray-50">
        <header className="mt-16 h-28 sm:h-56 mx-auto block">
          <div className="min-h-full flex flex-col justify-center items-center">
            <div className="text-4xl sm:text-6xl md:text-8xl text-white">
              <span className="font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-light-blue-200 ">
                blog
              </span>{' '}
              dedicado
            </div>
            <span className="mt-6 text-xs sm:text-sm text-blue-gray-200">
              conteúdo inteligente do universo da tecnologia
            </span>
          </div>
        </header>
      </div>
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
