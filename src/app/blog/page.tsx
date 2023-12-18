import BlogScreen from './screen'

export default async function BlogPage() {
  return (
    <div className="flex flex-col">
      <div className="w-full bg-gradient-to-r from-white to-slate-50">
        <header className="h-28 sm:h-56 mx-auto block">
          <div className="min-h-full flex justify-center items-center">
            <div className="text-4xl sm:text-6xl md:text-8xl text-slate-200">
              <span className="font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
                blog
              </span>{' '}
              dedicado
            </div>
          </div>
        </header>
      </div>
      <div className="mt-10">
        <BlogScreen />
      </div>
    </div>
  )
}
