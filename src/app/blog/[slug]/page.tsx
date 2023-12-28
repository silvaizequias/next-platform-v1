import PostDetailScreen from './screen'

export default async function PostDetailPage() {
  return (
    <div className="flex flex-col justify-center">
      <div className="max-w-full py-10">
        <div className="mx-2 sm:mx-8">
          <PostDetailScreen />
        </div>
      </div>
    </div>
  )
}
