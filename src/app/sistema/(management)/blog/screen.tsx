import PostListView from './views/PostListView'

export default function BlogAdminScreen() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-1 bg-slate-50 rounded-md p-4 shadow-md">
        <div className="w-full flex flex-col">
          <PostListView />
        </div>
      </div>
    </div>
  )
}
