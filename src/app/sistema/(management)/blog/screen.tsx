import PostEditor from './views/PostEditor'
import PostListView from './views/PostListView'

export default function BlogAdminScreen() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex justify-center bg-slate-100 rounded-md p-4 shadow-md">
        <PostEditor />
      </div>
      <div className="flex flex-1 bg-slate-50 rounded-md p-4 shadow-md">
        <div className="w-full flex flex-col">
          <PostListView />
        </div>
      </div>
    </div>
  )
}
